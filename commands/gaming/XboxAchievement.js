const Discord = require('discord.js');
const moment = require('moment-timezone');
const XboxLiveAuth = require('@xboxreplay/xboxlive-auth');
const XBLAuthentication = require('../../helpers/XBLAuthentication');
const axios = require('axios');
const helpers = require('../../helpers/helpers');

module.exports = {
    name: 'xboxachievement',
    category: 'gaming',
    aliases: ['xachievement'],
    description: 'Command to search through yours or someone elses Xbox achievements',
    cooldown: 5,
    async execute(message, args) {
        let errMsg = '';
        let gamertag = args.join(' ');
        helpers.pool.getConnection(function (err, connection) {
            connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, result_user) {
                connection.query(`SELECT * FROM ${process.env.mysql_xbox_table} WHERE user_id = ${result_user[0].id}`, function (err, result_gamertag) {
                    try {
                        if (!args[0]) {
                            Gamertag = result_gamertag && result_gamertag.length == 1 ? result_gamertag[0].gamertag : undefined;
                        }
                    }
                    catch (error) {
                        errMsg = 'Missing input credentials. Do !xboxgc gamer_tag [number]. Or !savegt gamer_tag to save your gamertag then !xboxgc [number].';
                        helpers.sendErr(message, errMsg);
                        return;
                    }
                    if (Gamertag === undefined) {
                        errMsg = 'Error reading your profile this will most likely be due to not having your GT saved to the database. !savegt <gamer_tag>.';
                        helpers.sendErr(message, errMsg);
                        return;
                    }
                })
            })
            connection.release();
        })
        // Check if gamertag is valid
        axios.get(`https://api.xboxreplay.net/players/${gamertag.replace(/_/g, '-')}`, XRauthInfo).then((xb1) => {
            // Send embed asking for the game they would like to use as an input.
            const embed = new Discord.MessageEmbed()
                .setColor(5544045)
                .setAuthor(`Gamertag confirmed [${xb1.data.gamertag}]`, `${xb1.data.gamerpic}`)
                .setDescription('What games achievements would you like to search?')
                .setFooter('Reply "cancel" to end the request');
            message.channel.send(embed).then(async msg => {
                msg.channel.awaitMessages(m => m.author.id == message.author.id,
                    { max: 1, time: 30000 }).then(async collected => {
                        const content = collected.first().content.toLowerCase();
                        // only accept messages by the user who sent the command
                        // accept only 1 message, and return the promise after 30000ms = 30s

                        // Cancels the request and edits the embed accordingly
                        if (content == 'cancel') {
                            errMsg = 'Request was canceled';
                            helpers.embedErr(msg, errMsg);
                            return;
                        }

                        else {
                            getGameInfo(msg, content);
                        }

                    }).catch(() => {
                        errMsg = `Request timed out | No reply after 30 seconds from [${message.author.username}]`;
                        helpers.embedErr(msg, errMsg);
                        return;
                    });
            });
        }, error => {
            if (error) errMsg = 'Error I couldn\'t find an account with that gamertag. Make sure you replace spaces with \'_\'';
            console.log(error);
            helpers.sendErr(message, errMsg);
            return;
        });
        async function getGameInfo(msg, game) {
            axios.get(`https://api.xboxreplay.net/games?&search=${game.replace(/ /g, '%20')}&lang=en-us`, XRauthInfo).then(async (xb1) => {
                if (xb1.data.data.length === 0) {
                    errMsg = 'I can\'t find that game. Make sure you\'ve spelled it correctly.';
                    helpers.embedErr(msg, errMsg);
                    return;
                }
                msg.delete();
                let order = 1;
                let maxLength = 0;
                let lstring = '';
                for (let i = 0; i < xb1.data.data.length; i++) {
                    maxLength++;
                    if (i > xb1.data.data.length) {
                        break;
                    }
                    const name = xb1.data.data[i].name;
                    lstring = lstring + `**${order}.** ${name}\n`;
                    if (order > 4) {
                        break;
                    }
                    order++;
                }
                const embed = new Discord.MessageEmbed()
                    .setColor(33992)
                    .setTitle('Please select the game you wish to choose')
                    .setDescription(lstring + '')
                    .setFooter('Reply "cancel" to end the request');
                message.channel.send({ embed }).then((message_) => {
                    msg.channel.awaitMessages(m => m.author.id == message.author.id,
                        { max: 1, time: 30000 }).then(async collected => {
                            const content = collected.first().content.toLowerCase();
                            const check = helpers.numCheck(1, maxLength, content);
                            if (content == 'cancel') {
                                errMsg = 'Request was canceled';
                                helpers.embedErr(message_, errMsg);
                                return;
                            }
                            else if (check.ok === false) {
                                errMsg = `Request timed out | ${check.reason}`;
                                helpers.embedErr(message_, errMsg);
                                return;
                            }
                            else {
                                const num = content - 1;
                                const gameInfo = {
                                    name: xb1.data.data[num].name,
                                    id: xb1.data.data[num].id,
                                    hero: xb1.data.data[num].image_urls.hero,
                                };
                                const desc = 'Gathering information and making request please wait';
                                helpers.embedEdit(message_, desc);
                                getAchievements(message_, gameInfo);
                            }
                        }).catch((err) => {
                            console.log(err);
                            errMsg = `Request timed out | No reply after 30 seconds from [${message.author.username}]`;
                            helpers.embedErr(msg, errMsg);
                            return;
                        });
                });
            }, error => {
                if (error) errMsg = 'I can\'t find that game. Make sure you\'ve spelled it correctly.';
                helpers.sendErr(msg, errMsg);
                return;
            });
        }
        let achievements;
        let gameInfo;
        let userInfo;
        async function getAchievements(msg, game) {
            let id = game.id;
            if (game.id === 1791712750) id = '1828326430';
            const settings = ['GameDisplayName', 'GameDisplayPicRaw', 'Gamerscore', 'Gamertag'];
            const authInfo = await _authenticate();
            const profile = await axios({
                method: 'get',
                url: `https://profile.xboxlive.com/users/gt(${gamertag.replace(/_/g, '%20')})/profile/settings`,
                params: { settings: settings.join(',') },
                headers: { 'x-xbl-contract-version': 2, 'content-type': 'application/json', Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}` },
            });
            axios({
                method: 'get',
                url: `https://achievements.xboxlive.com/users/xuid(${profile.data.profileUsers[0].id})/achievements`,
                params: { maxItems: 700, titleId: id },
                headers: { 'x-xbl-contract-version': 2, Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}` },
            }).then((xb1) => {
                achievements = xb1.data.achievements;
                gameInfo = game;
                userInfo = profile.data.profileUsers[0];
                achievementsHome(msg);
            });
        }
        function achievementsHome(msg) {
            if (achievements.length < 1) {
                errMsg = 'I couldn\'t find any achievements for that game. This command doesn\'t work for 360 games, sorry.';
                helpers.sendErr(msg, errMsg);
                return;
            }
            let completed = 0;
            const length = achievements.length;
            const maxPage = Math.ceil(length / 10) + 1;

            for (let i = 0; i < length; i++) {
                if (i === length) break;
                if (achievements[i].progressState === 'Achieved') completed++;
            }
            msg.delete();
            const embed = new Discord.MessageEmbed()
                .setTitle(`Achieved ${completed}/${length} | ${gameInfo.name}`)
                .setURL(gameInfo.hero)
                .setColor(33992)
                .setFooter(`🔢 Select page | ⏩ Next page | ℹ More info | Page 1/${maxPage}`, null)
                .setImage(gameInfo.hero)
                .setAuthor(`${userInfo.settings[0].value}s Achievements`, `${userInfo.settings[1].value}`);
            message.channel.send(embed).then(m => {
                m.react('🔢');
                m.react('⏩');
                m.react('ℹ');
                const filter = (r, user) => ['🔢', '⏩', 'ℹ'].includes(r.emoji.name) && (!user.bot);
                m.awaitReactions(filter, { max: 1, time: 30000 })
                    .then(collected => {
                        const r = collected.first();

                        if (r.emoji.name == '🔢') {
                            return selectPage(m, maxPage);
                        }
                        else if (r.emoji.name == '⏩') {
                            return pagingButtons(m, '⏩', '1');
                        }
                        else if (r.emoji.name == 'ℹ') {
                            return pagingButtons(m, 'ℹ', '1');
                        }
                    }).catch((err) => {
                        console.log(err);
                        m.reactions.removeAll();
                        return;
                    });
            });
        }
        function selectPage(message_, maxPage) {
            const desc = `Please select a number between 1 and ${maxPage} | Page 1 is the home page\n\nReply "cancel" to end the request`;
            helpers.embedEdit(message_, desc).then(async msg => {
                msg.channel.awaitMessages(m => m.author.id == message.author.id,
                    { max: 1, time: 30000 }).then(async collected => {
                        const content = collected.first().content.toLowerCase();
                        const check = helpers.numCheck(1, maxPage, content);

                        if (content == 'cancel') {
                            errMsg = 'Request was canceled';
                            helpers.embedErr(message_, errMsg);
                            return;
                        }
                        else if (check.ok === false) {
                            errMsg = `Request timed out | ${check.reason}`;
                            helpers.embedErr(message_, errMsg);
                            return;
                        }
                        else if (content == 1) {
                            return achievementsHome(msg);
                        }
                        else if (content == 2) {
                            firstPage(message_, maxPage);
                            message_.delete();
                            return;
                        }
                        else {
                            let order = `${content - 2}1`;
                            let lstring = '';
                            for (let i = (content - 2) * 10; i < achievements.length; i++) {
                                if (i > achievements.length - 1) {
                                    break;
                                }
                                let description = achievements[i].description;
                                if (achievements[i].description.length > 35) {
                                    description = achievements[i].description.slice(0, 35) + '...';
                                }
                                let name = `\`${achievements[i].name}\``;
                                if (achievements[i].progressState === 'Achieved') name = `**${achievements[i].name}**`;
                                lstring = lstring + `**${order}.** ${name} | ${description}\n`;
                                order++;

                                if (order > `${content - 1}0`) {
                                    break;
                                }
                            }
                            const embed = new Discord.MessageEmbed()
                                .setAuthor(`${userInfo.settings[0].value}s Achievements`, `${userInfo.settings[1].value}`)
                                .setColor(33992)
                                .setTitle(`${gameInfo.name}: (page ${content})`)
                                .setDescription(lstring + '')
                                .setFooter(`🔢 Select page | ⏪ Previous page | ⏩ Next page | ℹ More info | Page ${content}/${maxPage}`);
                            message.channel.send({ embed }).then(emb => {
                                buttons(emb, maxPage, content);
                            });
                        }

                    }).catch((err) => {
                        msg.reactions.removeAll();
                        console.log(err);
                        errMsg = `Request timed out | No reply after 30 seconds from [${message.author.username}]`;
                        helpers.embedErr(msg, errMsg);
                        return;
                    });
            });
        }
        function buttons(message_, maxPage, curPage) {
            message_.react('🔢');
            message_.react('⏪');
            message_.react('⏩');
            message_.react('ℹ');
            const filter = (r, user) => ['🔢', '⏩', '⏪', 'ℹ'].includes(r.emoji.name) && (!user.bot);
            message_.awaitReactions(filter, { max: 1, time: 30000 })
                .then(collected => {
                    const r = collected.first();

                    if (r.emoji.name == '🔢') {
                        return selectPage(message_, maxPage);
                    }
                    else if (r.emoji.name == '⏪') {
                        return pagingButtons(message_, '⏪', curPage);
                    }
                    else if (r.emoji.name == '⏩') {
                        return pagingButtons(message_, '⏩', curPage);
                    }
                    else if (r.emoji.name == 'ℹ') {
                        return pagingButtons(message_, 'ℹ', curPage);
                    }
                }).catch((err) => {
                    console.log(err);
                    message_.reactions.removeAll();
                    return;
                });
        }
        function pagingButtons(message_, button, curPage) {
            const length = achievements.length;
            const maxPage = Math.ceil(length / 10) + 1;
            if (button === '⏪') {
                if (curPage == '1') {
                    achievementsHome(message_);
                    return;
                }
                else if (curPage == '2') {
                    achievementsHome(message_);
                    return;
                }
                else if (curPage == '3') {
                    firstPage(message_, maxPage);
                    message_.delete();
                    return;
                }
                else {
                    const newPage = parseInt(curPage) - 1;
                    let order = `${newPage - 2}1`;
                    let lstring = '';
                    for (let i = (newPage - 2) * 10; i < achievements.length; i++) {
                        if (i > achievements.length - 1) {
                            break;
                        }
                        let description = achievements[i].description;
                        if (achievements[i].description.length > 35) {
                            description = achievements[i].description.slice(0, 35) + '...';
                        }
                        let name = `\`${achievements[i].name}\``;
                        if (achievements[i].progressState === 'Achieved') name = `**${achievements[i].name}**`;
                        lstring = lstring + `**${order}.** ${name} | ${description}\n`;
                        order++;

                        if (order > `${newPage - 1}0`) {
                            break;
                        }
                    }
                    message_.delete();
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`${userInfo.settings[0].value}s Achievements`, `${userInfo.settings[1].value}`)
                        .setColor(33992)
                        .setTitle(`${gameInfo.name}: (page ${newPage})`)
                        .setDescription(lstring + '')
                        .setFooter(`🔢 Select page | ⏪ Previous page | ⏩ Next page | ℹ More info | Page ${newPage}/${maxPage}`);
                    message.channel.send({ embed }).then(emb => {
                        buttons(emb, maxPage, newPage);
                    });
                }
            }
            else if (button === '⏩') {
                if (curPage == maxPage) {
                    achievementsHome(message_);
                    return;
                }
                else if (curPage == '1') {
                    firstPage(message_, maxPage);
                    message_.delete();
                    return;
                }
                else {
                    const newPage = parseInt(curPage) + 1;
                    let order = `${newPage - 2}1`;
                    let lstring = '';
                    for (let i = (newPage - 2) * 10; i < achievements.length; i++) {
                        if (i > achievements.length - 1) {
                            break;
                        }
                        let description = achievements[i].description;
                        if (achievements[i].description.length > 35) {
                            description = achievements[i].description.slice(0, 35) + '...';
                        }
                        let name = `\`${achievements[i].name}\``;
                        if (achievements[i].progressState === 'Achieved') name = `**${achievements[i].name}**`;
                        lstring = lstring + `**${order}.** ${name} | ${description}\n`;
                        order++;

                        if (order > `${newPage - 1}0`) {
                            break;
                        }
                    }
                    message_.delete();
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`${userInfo.settings[0].value}s Achievements`, `${userInfo.settings[1].value}`)
                        .setColor(33992)
                        .setTitle(`${gameInfo.name}: (page ${newPage})`)
                        .setDescription(lstring + '')
                        .setFooter(`🔢 Select page | ⏪ Previous page | ⏩ Next page | ℹ More info | Page ${newPage}/${maxPage}`);
                    message.channel.send({ embed }).then(emb => {
                        buttons(emb, maxPage, newPage);
                    });
                }
            }
            else if (button === 'ℹ') {
                const embed = new Discord.MessageEmbed()
                    .setColor(33992)
                    .setDescription('Please select the achievments number to get more info!')
                    .setFooter('Reply "cancel" to end the request');
                message.channel.send({ embed }).then((msg) => {
                    msg.channel.awaitMessages(m => m.author.id == message.author.id,
                        { max: 1, time: 30000 }).then(async collected => {
                            const content = collected.first().content.toLowerCase();
                            const check = helpers.numCheck(1, length, content);
                            if (content == 'cancel') {
                                errMsg = 'Request was canceled';
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
                            else if (check.ok === false) {
                                errMsg = `Request timed out | ${check.reason}`;
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
                            else {
                                let unlocked = `**${userInfo.settings[0].value}** has not unlocked this achievment`;
                                const num = content - 1;
                                const data = achievements[num];
                                let estimatedTime = data.estimatedTime;
                                if (data.progressState === 'Achieved') unlocked = `**${userInfo.settings[0].value}** unlocked this achievment on ${data.progression.timeUnlocked.replace(/T/g, ' ').replace(/Z/g, '').slice(0, 10)}`;
                                if (data.estimatedTime === '00:00:00') estimatedTime = 'unknown';
                                const info = new Discord.MessageEmbed()
                                    .setTitle(`${gameInfo.name} | ${data.name} | ${data.rewards[0].value} Gamerscore`)
                                    .setURL(data.mediaAssets[0].url)
                                    .setDescription(`**Requirements:** ${data.lockedDescription}\n\n${unlocked}`)
                                    .setColor(33992)
                                    .setFooter(`Estimated time to unlock: ${estimatedTime} | Achievement Id: ${data.id} `, null)
                                    .setImage(data.mediaAssets[0].url)
                                    .setAuthor(`${userInfo.settings[0].value}s Achievements`, `${userInfo.settings[1].value}`);
                                message.channel.send({ embed: info }).then(m => {
                                    msg.delete();
                                    message_.delete();
                                    buttons(m, maxPage, curPage);
                                });
                                return;
                            }
                        }).catch((err) => {
                            console.log(err);
                            errMsg = `Request timed out | No reply after 30 seconds from [${message.author.username}]`;
                            helpers.embedErr(msg, errMsg);
                            return;
                        });
                });
            }
        }

        function firstPage(message_, maxPage) {
            let order = 1;
            let lstring = '';
            for (let i = 0; i < achievements.length; i++) {
                if (i > achievements.length - 1) {
                    break;
                }
                let description = achievements[i].description;
                if (achievements[i].description.length > 35) {
                    description = achievements[i].description.slice(0, 35) + '...';
                }
                let name = `\`${achievements[i].name}\``;
                if (achievements[i].progressState === 'Achieved') name = `**${achievements[i].name}**`;
                lstring = lstring + `**${order}.** ${name} | ${description}\n`;
                order++;

                if (order > 10) {
                    break;
                }
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${userInfo.settings[0].value}s Achievements`, `${userInfo.settings[1].value}`)
                .setColor(33992)
                .setTitle(`${gameInfo.name}: (page 2)`)
                .setDescription(lstring + '')
                .setFooter(`🔢 Select page | ⏪ Previous page | ⏩ Next page | ℹ More info | Page 2/${maxPage}`);
            message.channel.send({ embed }).then(emb => {
                buttons(emb, maxPage, '2');
            });

        }
        // gt(gamer%20tag) xuid(xuid)

        async function _authenticate() {
            const savedAuth = XBLAuthentication.get();
            if (savedAuth.expiresOn &&
                savedAuth.expiresOn.length > 0 &&
                new Date(savedAuth.expiresOn) > new Date()
            ) { return savedAuth; }
            else {
                const auth = await XboxLiveAuth.authenticate(process.env.XBL_EMAIL, process.env.XBL_PASSWORD);
                return XBLAuthentication.save(auth);
            }
        }

    }
};