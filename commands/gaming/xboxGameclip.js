const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require('../../helpers/helpers');
const xboxgt = require('../../schemas/xboxgt.js');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'xboxgameclip',
    category: 'gaming',
    aliases: ['xboxgc'],
    description: 'Shows a random gameclip of yours if it has been uploaded or a specfic one if you give it a number.',
    cooldown: 5,
    async execute(message, args) {
        //find gt from database
        helpers.pool.getConnection(function (err, connection) {
            connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, result_user) {
                connection.query(`SELECT * FROM ${process.env.mysql_xbox_table} WHERE user_id = ${result_user[0].id}`, function (err, result_gamertag) {
                    let Gamertag = args[0];
                    let num = args[1];
                    let errMsg = '';
                    const embed = new Discord.MessageEmbed()
                        .setColor(5544045)
                        .setTitle('Validating information and making the request please wait.');
                    message.channel.send(embed).then(async msg => {
                        try {
                            // Check whether to use args[0] or DB for gamertag input.

                            if (!isNaN(args[0]) || !args[0] || args[0] === 'recent' || args[0] === 'search' || args[0] === 'oldest' || args[0] === 'list') {

                                Gamertag = result_gamertag && result_gamertag.length == 1 ? result_gamertag[0].gamertag : undefined;
                            }
                        }

                        catch (error) {
                            errMsg = 'Missing input credentials. Do !xboxgc gamer_tag [number]. Or !savegt gamer\\_tag to save your gamertag then !xboxgc [number].';
                            helpers.embedErr(msg, errMsg);
                        }
                        if (Gamertag === undefined) {
                            errMsg = 'Error reading your profile this will most likely be due to not having your GT saved to the database. !savegt <gamer_tag>.';
                            helpers.embedErr(msg, errMsg);
                            return;
                        }

                        const authInfo = { headers: { 'Authorization': process.env.XBOXREPLAY_AUTHORIZATION } };

                        if (args[0] === 'search') {
                            const Game = args.slice(1).join(' ');
                            if (!Game) {
                                errMsg = 'You need to specify a game for me to filter by.';
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
                            const data = await axios.get(`https://api.xboxreplay.net/games?count=1&search=${Game.replace(/ /g, '%20')}&lang=en-us`, authInfo);
                            if (data.data.data.length === 0) {
                                errMsg = 'I can\'t find that game. Make sure you\'ve spelled it correctly. Try *not* using the abbreviated name and replace arabic numerals with roman counterpart and vice-versa';
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
                            axios.all([
                                axios.get(`https://api.xboxreplay.net/players/${Gamertag.replace(/_/g, '-')}`, authInfo),
                                axios.get(`https://api.xboxreplay.net/search/game-dvr?target=clips&gamertag=${Gamertag.replace(/_/g, '%20')}&game_id=${data.data.data[0].id}`, authInfo),
                            ]).then(axios.spread((xb1, xb2) => {
                                // console.log(`There is ${xb2.headers['x-rate-limit-remaining']} calls remianing to the Xbox API. Rate limit reset ${xb2.headers['x-rate-limit-reset']} (Rate limit total - ${xb2.headers['x-rate-limit-limit']})`);
                                const total = xb2.data.data.length;
                                const random = Math.floor(Math.random() * (total));
                                if (total === 0) {
                                    errMsg = `You dont have any clips available for ${data.data.data[0].name}`;
                                    helpers.embedErr(msg, errMsg);
                                    return;
                                }
                                const xbox = xb2.data.data[random];

                                const embed = new Discord.MessageEmbed()
                                    .setAuthor(`${xbox.author.gamertag}`, `${xbox.author.gamerpic}`, `${xbox.download_urls.source}`)
                                    .setColor(xb1.data.colors.primary)
                                    .setTitle(`${xbox.game.name} | Click here to watch`)
                                    .setURL(xbox.share_urls.play)
                                    .attachFiles([{ name: 'image.png', attachment: `${xbox.thumbnail_urls.small}` }])
                                    .setImage('attachment://image.png')
                                    .setFooter(`${xbox.uploaded_at.replace(/T/g, ' ').replace(/Z/g, '').slice(0, 10)} | Views: ${xbox.metadata.views} | ${xbox.type.replace(/c/g, 'C')} ${random + 1}/${total}`, 'https://images.discordapp.net/avatars/736204347171405904/4a6e15dc6e0f0f5ec92c150899e0e52b.png?size=512');
                                message.channel.send(embed).then(m => {
                                    msg.delete();
                                    m.react('❌')
                                        .then(r => {
                                            const reactFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                                            m.awaitReactions(reactFilter, { max: 1 })
                                                .then(collected => {
                                                    m.delete();
                                                    message.delete();
                                                })
                                                .catch(console.error);
                                        });
                                }).catch((err) => {
                                    console.log(`Error at line 94: ${err}`)
                                    errMsg = `Request timed out | Error has been logged to console`;
                                    helpers.embedErr(msg, errMsg);
                                    return;
                                });
                            }), error => {
                                if (error) {
                                    errMsg = 'Error reading your profile this will most likely be due to your xbox account privacy settings or an invalid gamertag.';
                                    helpers.embedErr(msg, errMsg);
                                    return;
                                }
                            });
                        }
                        else {
                            axios.all([
                                axios.get(`https://api.xboxreplay.net/players/${Gamertag.replace(/_/g, '-')}`, authInfo),
                                axios.get(`https://api.xboxreplay.net/players/${Gamertag.replace(/_/g, '-')}/clips`, authInfo),
                            ]).then(axios.spread(async (xb1, xb2) => {
                                // console.log(`There is ${xb2.headers['x-rate-limit-remaining']} calls remianing to the Xbox API. Rate limit reset ${xb2.headers['x-rate-limit-reset']} (Rate limit total - ${xb2.headers['x-rate-limit-limit']})`);
                                const total = xb2.data.additional.total;
                                if (xb2.data.data.length == '0') {
                                    errMsg = `You dont have any clips available for ${xb1.data.gamertag}`;
                                    helpers.embedErr(msg, errMsg);
                                    return;
                                }
                                if (!isNaN(args[0])) {
                                    num = args[0];
                                }
                                else if (message.content.toLowerCase().includes('recent')) {
                                    num = ('1');
                                }

                                else if (message.content.toLowerCase().includes('oldest')) {
                                    num = (total);
                                }

                                else if (!num) {
                                    num = Math.floor(Math.random() * (total - 1)) + 1;
                                }

                                const numCheck = helpers.numCheck(1, total, num);
                                if (numCheck.ok === false) {
                                    errMsg = `Request timed out | ${numCheck.reason}`;
                                    helpers.embedErr(msg, errMsg);
                                    return;
                                }
                                if (args[0] === 'list') {
                                    let currentPage = 0;
                                    if (args[1]) {
                                        currentPage = args[1] - 1;
                                        const pageCheck = helpers.numCheck(1, Math.ceil(xb2.data.data.length / 10), currentPage + 1);
                                        if (pageCheck.ok === false) {
                                            errMsg = `Request timed out | ${pageCheck.reason}`;
                                            helpers.embedErr(msg, errMsg);
                                            return;
                                        }
                                    }
                                    const embeds = gernerateXboxgcPageEmbed(xb2.data.data, xb1.data);
                                    const pageEmbed = await msg.edit(embeds[currentPage]);
                                    await pageEmbed.react('⬅');
                                    await pageEmbed.react('➡');
                                    await pageEmbed.react('❌');

                                    const filter = (reaction, user) => ['⬅', '➡', '❌'].includes(reaction.emoji.name) && (message.author.id === user.id);
                                    const collector = pageEmbed.createReactionCollector(filter, { time: 45000 });

                                    collector.on('collect', async (reaction, user) => {
                                        if (reaction.emoji.name === '➡') {
                                            if (currentPage < embeds.length - 1) {
                                                currentPage++;
                                                pageEmbed.edit(embeds[currentPage]);
                                                pageEmbed.reactions.resolve('➡').users.remove(message.author.id);
                                                collector.resetTimer();
                                            }
                                        }
                                        else if (reaction.emoji.name === '⬅') {
                                            if (currentPage !== 0) {
                                                --currentPage;
                                                pageEmbed.edit(embeds[currentPage]);
                                                pageEmbed.reactions.resolve('⬅').users.remove(message.author.id);
                                                collector.resetTimer();
                                            }
                                        }
                                        else {
                                            collector.stop();
                                            await pageEmbed.reactions.removeAll();
                                        }
                                    });
                                    collector.on('end', collected => pageEmbed.reactions.removeAll());
                                }
                                else {
                                    const xbox = xb2.data.data[num - 1];

                                    const embed = new Discord.MessageEmbed()
                                        .setAuthor(`${xbox.author.gamertag}`, `${xbox.author.gamerpic}`, `${xbox.download_urls.source}`)
                                        .setColor(xb1.data.colors.primary)
                                        .setTitle(`${xbox.game.name} | Click here to watch`)
                                        .setURL(xbox.share_urls.play)
                                        .attachFiles([{ name: 'image.png', attachment: `${xbox.thumbnail_urls.small}` }])
                                        .setImage('attachment://image.png')
                                        .setFooter(`${xbox.uploaded_at.replace(/T/g, ' ').replace(/Z/g, '').slice(0, 10)} | Views: ${xbox.metadata.views} | ${xbox.type.replace(/c/g, 'C')} ${num}/${total}`, 'https://images.discordapp.net/avatars/736204347171405904/4a6e15dc6e0f0f5ec92c150899e0e52b.png?size=512');
                                    message.channel.send(embed).then(m => {
                                        msg.delete();
                                        m.react('❌')
                                            .then(r => {
                                                const reactFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                                                m.awaitReactions(reactFilter, { max: 1 })
                                                    .then(collected => {
                                                        m.delete();
                                                        message.delete();
                                                    })
                                                    .catch(console.error);
                                            });
                                    }).catch((err) => {
                                        console.log(`Error at line 202: ${err}`)
                                        errMsg = `Request timed out | Error has been logged to console`;
                                        helpers.embedErr(msg, errMsg);
                                        return;
                                    });
                                }
                            }), error => {
                                if (error) {
                                    errMsg = 'Error reading your profile this will most likely be due to your xbox account privacy settings or an invalid gamertag.';
                                    helpers.embedErr(msg, errMsg);
                                    return;
                                }
                            });
                        }
                    });
                })
            })
            connection.release();
        })
    }
};
function gernerateXboxgcPageEmbed(arr, user) {
    const embeds = [];
    let k = 10;
    for (let i = 0; i < arr.length; i += 10) {
        const current = arr.slice(i, k);
        let j = i;
        k += 10;
        let v = 0;
        current.map(content => v = v + content.metadata.views);
        const info = current.map(content => `**${++j}.** [${content.game.name}](${content.share_urls.play}) | Uploaded ${content.uploaded_at.replace(/T/g, ' ').replace(/Z/g, '').replace(/-/g, '/').slice(0, 10)}`).join('\n');
        const embed = new MessageEmbed()
            .setAuthor(`${arr[0].author.gamertag}`, `${arr[0].author.gamerpic}`)
            .setTitle(`Xbox Gameclips: (page ${(k / 10) - 1}/${Math.ceil(arr.length / 10)})`)
            .setColor(user.colors.primary)
            .setFooter(`Total Views: ${v} | Page ${(k / 10) - 1}/${Math.ceil(arr.length / 10)}`)
            .setDescription(`${info}`);
        embeds.push(embed);
    }
    return embeds;
}