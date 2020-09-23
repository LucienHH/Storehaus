
const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
const fetch = require('node-fetch');
// const { require } = require('find-config');
let helpers = require("../helpers/helpers")

module.exports = {
    name: 'leaguelink',
    description: 'Link a league of legends account to your Discord account',
    cooldown: 5,
    async execute(message, args) {
        let summoner = args.slice(0).join(" ");
        if (summoner == undefined || summoner == "") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must insert your summoner name. Example: `!leaguelink johnsmith`")).then(m => m.delete({ timeout: 10000 }));
            return;
        }

        message.channel.send(new Discord.MessageEmbed()
            .setTitle("Choose a region:")
            .addField('\:zero: - EUNE', '\u200b', true)
            .addField('\:one: - EUW', '\u200b', true)
            .addField('\:two: - NA', '\u200b', true)
            .addField('\:three: - BR', '\u200b', true)
            .addField('\:four: - LAN', '\u200b', true)
            .addField('\:five: - LAS', '\u200b', true)
            .addField('\:six: - OCE', '\u200b', true)
            .addField('\:seven: - KR', '\u200b', true)
            .addField('\:eight: - RU', '\u200b', true)
            .addField('\:nine: - TR', '\u200b', true)
            .addField('\:keycap_ten: - JP', '\u200b', true))
            .then(function (message_) {
                message_.react('0️⃣');
                message_.react('1️⃣');
                message_.react('2️⃣');
                message_.react('3️⃣');
                message_.react('4️⃣');
                message_.react('5️⃣');
                message_.react('6️⃣');
                message_.react('7️⃣');
                message_.react('8️⃣');
                message_.react('9️⃣');
                message_.react('🔟');


                const filter = (reaction, user) => {
                    return ['0️⃣', '1️⃣',
                        '2️⃣', '3️⃣',
                        '4️⃣', '5️⃣',
                        '6️⃣', '7️⃣',
                        '8️⃣', '9️⃣',
                        '🔟',].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                message_.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first()
                        let region;
                        switch (reaction.emoji.name) {
                            case '0️⃣':
                                region = 'eun1';
                                break;
                            case '1️⃣':
                                region = 'euw1';
                                break;
                            case '2️⃣':
                                region = 'na1';
                                break;
                            case '3️⃣':
                                region = 'br1';
                                break;
                            case '4️⃣':
                                region = 'la1';
                                break;
                            case '5️⃣':
                                region = 'la2';
                                break;
                            case '6️⃣':
                                region = 'oc1';
                                break;
                            case '7️⃣':
                                region = 'kr';
                                break;
                            case '8️⃣':
                                region = 'ru';
                                break;
                            case '9️⃣':
                                region = 'tr1';
                                break;
                            case '🔟':
                                region = 'jp1';
                                break;

                        }
                        console.log(region);
                        let con = helpers.connectMYSQL();
                        con.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, user_results) {
                            if (err) {
                                console.log(err);
                            }
                            con.query(`SELECT * FROM ${process.env.mysql_league_summoners_table} WHERE user_id = ${user_results[0]['id']}`, function (err, summoner_result) {
                                if (err) {
                                    console.log(err);
                                }
                                if (summoner_result == undefined) {
                                    con.query(`INSERT INTO ${process.env.mysql_league_summoners_table} VALUES (NULL, ${user_results[0]['id']}, ${summoner}, "${region}")`, function (err, results) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        message.channel.send(new Discord.MessageEmbed().setTitle(`Account linked to: "${summoner}" - region: [${region}]`)).then(message => message.delete({ timeout: 10000 }))
                                    })
                                } else if (summoner_result == 0) {
                                    con.query(`INSERT INTO ${process.env.mysql_league_summoners_table} VALUES (NULL, ${user_results[0]['id']}, "${summoner}", "${region}")`, function (err, results) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        message.channel.send(new Discord.MessageEmbed().setTitle(`Account linked to: "${summoner}" - region: [${region}]`)).then(message => message.delete({ timeout: 10000 }))
                                    })
                                } else {
                                    con.query(`UPDATE ${process.env.mysql_league_summoners_table} SET summoner_name = "${summoner}", region =  "${region}" where user_id=${user_results[0]['id']}`, function (err, results) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        message.channel.send(new Discord.MessageEmbed().setTitle(`Account linked to: "${summoner}" - region: [${region}]`)).then(message => message.delete({ timeout: 10000 }))
                                    })
                                }
                            })

                        })
                    })

            })
    }
}