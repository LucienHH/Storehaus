const Discord = require('discord.js');
const moment = require('moment-timezone');
const XboxLiveAuth = require('@xboxreplay/xboxlive-auth');
const XBLAuthentication = require('../../helpers/XBLAuthentication');
const axios = require('axios');
const helpers = require('../../helpers/helpers');

module.exports = {
    name: 'xboxcheck',
    category: 'gaming',
    aliases: ['check'],
    description: 'Command to check if you or a friend has a certain achievement',
    cooldown: 5,
    async execute(message, args) {
        const XRauthInfo = { headers: { 'Authorization': process.env.XBOXREPLAY_AUTHORIZATION } };
        let errMsg = '';
        let gamertag = args.join(' ');
        helpers.pool.getConnection(function (err, connection) {
            connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, result_user) {
                connection.query(`SELECT * FROM ${process.env.mysql_xbox_table} WHERE user_id = ${result_user[0].id}`, function (err, result_gamertag) {
                    try {
                        if (!args[0]) {
                            gamertag = result_gamertag && result_gamertag.length == 1 ? result_gamertag[0].gamertag : undefined;
                        }
                    }
                    catch (error) {
                        errMsg = 'Missing input credentials. Do !check gamertag. Or !savegt <gamer_tag> to save your gamertag then !check.';
                        helpers.sendErr(message, errMsg);
                        return;
                    }
                    if (gamertag === undefined) {
                        errMsg = 'Error reading your profile this will most likely be due to not having your GT saved to the database. !savegt <gamer_tag>.';
                        helpers.sendErr(message, errMsg);
                        return;
                    }

                    axios.get(`https://api.xboxreplay.net/players/${gamertag.replace(/_/g, '-')}`, XRauthInfo).then((xb1) => {
                        // Send embed asking for the game they would like to use as an input.
                        const embed = new Discord.MessageEmbed()
                            .setColor(5544045)
                            .setAuthor(`Gamertag confirmed [${xb1.data.gamertag}]`, `${xb1.data.gamerpic}`)
                            .setDescription('Please enter the game id and achievement id seperated by a space.')
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
                                        helpers.embedEdit(msg, errMsg);
                                        return;
                                    }
                                    else {
                                        const params = content.split(' ');
                                        console.log(params);
                                        getGameInfo(msg, xb1.data, params[0], params[1]);
                                    }

                                }).catch(() => {
                                    errMsg = `Request timed out | No reply after 30 seconds from [${message.author.username}]`;
                                    helpers.embedErr(msg, errMsg);
                                    return;
                                });
                        });
                    }, error => {
                        if (error) errMsg = 'Error I couldn\'t find an account with that gamertag.';
                        console.log(error);
                        helpers.sendErr(message, errMsg);
                        return;
                    });
                })
            })
            connection.release();
        })
        async function getGameInfo(msg, xb1, gameId, achId) {
            axios.get(`https://api.xboxreplay.net/games/${gameId}`, XRauthInfo).then(async (xb2) => {
                if (xb2.data.name === undefined) {
                    errMsg = 'I can\'t find that game. Make sure you\'ve used the right ID.';
                    helpers.embedErr(msg, errMsg);
                    return;
                }
                const gameInfo = {
                    name: xb2.data.name,
                    id: xb2.data.id,
                    hero: xb2.data.image_urls.hero,
                };
                const userInfo = {
                    name: xb1.gamertag,
                    gamerpic: xb1.gamerpic,
                    color: xb1.colors.primary,
                };
                const desc = `Beginning  check on the profile ${xb1.gamertag}\nGame Id: ${gameId}\nAchievement Id: ${achId}`;
                helpers.embedEdit(msg, desc);
                getAchievements(msg, userInfo, gameInfo, gameId, achId);
            }, error => {
                if (error) errMsg = 'I can\'t find that game. Make sure you\'ve used the right ID.';
                console.log(error);
                helpers.embedErr(msg, errMsg);
                return;
            });
        }
        async function getAchievements(msg, userInfo, gameInfo, gameId, achId) {
            const settings = ['GameDisplayName', 'GameDisplayPicRaw', 'Gamerscore', 'Gamertag'];
            const authInfo = await _authenticate();
            axios({
                method: 'get',
                url: `https://profile.xboxlive.com/users/gt(${userInfo.name})/profile/settings`,
                params: { settings: settings.join(',') },
                headers: { 'x-xbl-contract-version': 2, 'content-type': 'application/json', Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}` },
            }).then((profile) => {
                axios({
                    method: 'get',
                    url: `https://achievements.xboxlive.com/users/xuid(${profile.data.profileUsers[0].id})/achievements`,
                    params: { maxItems: 700, titleId: gameId },
                    headers: { 'x-xbl-contract-version': 2, Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}` },
                }).then((xb1) => {
                    const achievements = xb1.data.achievements;
                    const length = achievements.length;
                    for (let i = 0; i < length; i++) {
                        if (i == length) {
                            errMsg = `Error, couldn't find any achievements linked with the ID: ${achId}`;
                            helpers.embedErr(msg, errMsg);
                            return;
                        }
                        if (achievements[i].id == achId) {
                            if (achievements[i].progressState === 'Achieved') {
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#00FF7F')
                                    .setTitle('Check Complete')
                                    .setImage(achievements[i].mediaAssets[0].url)
                                    .addField(`Achievement: ${achievements[i].name}`, `${userInfo.name} **has** unlocked this achievement`)
                                    .addField(`Game: ${gameInfo.name} | Unlocked: ${achievements[i].progression.timeUnlocked.replace(/T/g, ' ').replace(/Z/g, '').slice(0, 10)}`, achievements[i].lockedDescription)
                                    .setFooter(`Game Id: ${gameId} | Achievement Id: ${achId}`);
                                msg.edit(embed);
                                return;
                            }
                            else {
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#ff0000')
                                    .setTitle('Check Complete')
                                    .setImage(achievements[i].mediaAssets[0].url)
                                    .addField(`Achievement: ${achievements[i].name}`, `${userInfo.name} **has not** unlocked this achievement`)
                                    .addField(`Game: ${gameInfo.name}`, achievements[i].lockedDescription)
                                    .setFooter(`Game Id: ${gameId} | Achievement Id: ${achId}`);
                                msg.edit(embed);
                                return;
                            }
                        }
                    }
                }, error => {
                    if (error) errMsg = 'Error searching for achievements. Error has been logged to console.';
                    helpers.sendErr(msg, errMsg);
                    console.log(error);
                    return;
                });
            }, error => {
                if(error) {
                    errMsg = 'I can\'t access that profiles xuid. Make sure the account settings aren\'t restricting access.';
                    helpers.embedErr(msg, errMsg);
                    return;
                }
            });
        }
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