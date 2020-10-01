const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require('../helpers/helpers');
const xboxgt = require('../schemas/xboxgt.js');
const axios = require('axios');

module.exports = {
    name: 'xboxgameclip',
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

                    try {
                        // Check whether to use args[0] or DB for gamertag input.
                        if (!isNaN(args[0]) || !args[0] || args[0] === 'recent') {
                            Gamertag = result_gamertag && result_gamertag.length == 1 ? result_gamertag[0].gamertag : undefined;
                        }
                    }

                    catch (error) {
                        errMsg = 'Missing input credentials. Do !xboxgc gamer_tag [number]. Or !savegt gamer_tag to save your gamertag then !xboxgc [number].';
                        helpers.embedErr(msg, errMsg);
                    }
                    let errMsg = '';
                    const embed = new Discord.MessageEmbed()
                        .setColor(5544045)
                        .setTitle('Validating information and making the request please wait.');
                    message.channel.send(embed).then(msg => {
          
        
                        const authInfo = { headers: { 'Authorization': process.env.XBOXREPLAY_AUTHORIZATION } };
        
                        axios.all([
                            axios.get(`https://api.xboxreplay.net/players/${Gamertag.replace(/_/g, '-')}`, authInfo),
                            axios.get(`https://api.xboxreplay.net/players/${Gamertag.replace(/_/g, '-')}/clips`, authInfo),
                        ]).then(axios.spread((xb1, xb2) => {
                            console.log(`There is ${xb2.headers['x-rate-limit-remaining']} calls remianing to the Xbox API. Rate limit reset ${xb2.headers['x-rate-limit-reset']} (Rate limit total - ${xb2.headers['x-rate-limit-limit']})`);
                            const total = xb2.data.additional.total;
                            if (!isNaN(args[0])) {
                                num = args[0];
                            }
                            else if (message.content.toLowerCase().includes('recent')) {
                                num = ('1');
                            }
                            else if (!num) {
                                num = Math.floor(Math.random() * (total - 1)) + 1;
                            }
        
                            if (total < 1) {
                                errMsg = 'Error reading your profile this will most likely be due to your xbox account privacy settings or an invalid gamertag.';
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
                            if (isNaN(num)) {
                                errMsg = 'That doesnt look like a number or you incorrectly formated the command. Do !help xboxss to find out.'
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
                            if (num > total) {
                                errMsg = `You dont have that many gameclips! Pick between 0 and ${total}.`
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
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
                            });
                        }), error => {
                            if (error) {
                                errMsg = 'Error reading your profile this will most likely be due to your xbox account privacy settings or an invalid gamertag.';
                                helpers.embedErr(msg, errMsg);
                                return;
                            }
                        });
                    });
                })
            })
        })
    }
};