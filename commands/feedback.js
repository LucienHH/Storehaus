const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require("../helpers/helpers")

var mysql = require('mysql');
const { options } = require("snekfetch");
module.exports = {
    name: 'feedback',
    description: 'Report a bug / Suggest a feature [Any misuse of the command may lead to a temporary / permanent ban from using the bot]',
    usage: "[report content]",
    cooldown: 5,
    async execute(message, args) {
        message.delete();

        // await console.log(helpers.userID.toString());

        let report = await args.slice(0).join(" ");
        if (report.length < 20) {
            let embed = await new Discord.MessageEmbed()
                .setTitle("Your report is too short. Needs to be at least 20 characters");
            message.channel.send(embed)
            return;
        }
        let embed = await new Discord.MessageEmbed()
            .setTitle("You are about to send the following message:")
            .setDescription(report)
            .addField("\u200b", "Are you sure you want to send it? You have 30 seconds")
        await message.channel.send(embed).then(function (message_) {
            // message.react("✅");
            // message.react("❌");
            message_.react('✅').then(() => message_.react('❌'));

            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            message_.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '✅') {
                        message_.reactions.removeAll();
                        embed = new Discord.MessageEmbed()
                            .setTitle("Contact request")
                            .addField("\u200b", "Do you wish to be contacted by the developers? You have 30 seconds");

                        message_.edit(embed);
                        message_.react('✅').then(() => message_.react('❌'));
                        message_.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();
                                message_.reactions.removeAll();
                                let contactPermission = reaction.emoji.name == '✅' ? "yes" : "no";
                                embed = new Discord.MessageEmbed()
                                    .setTitle("Sent")

                                message_.edit(embed);
                                message_.delete({ timeout: 10000 })
                                var con = helpers.connectMYSQL(); // connect to the pool?
                                con.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, results) {
                                    if (results.length != 0) {
                                        con.query(`INSERT INTO ${process.env.mysql_bug_reports_table} VALUES(NULL, "${message.author.username + '#' + message.author.discriminator}", 
                                        "${results[0]['id']}",
                                        "${report}",
                                        "Pending",
                                        "${contactPermission}",
                                        DEFAULT)`, function (err, result) {
                                            if (err) throw err;
                                        });
                                    } else {
                                        con.query(`INSERT INTO ${process.env.mysql_users_table} VALUES (NULL, ${message.author.id})`, function (err, results) {
                                            con.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, results) {
                                                con.query(`INSERT INTO ${process.env.mysql_bug_reports_table} VALUES(NULL, "${message.author.username + '#' + message.author.discriminator}", 
                                                "${results[0]['id']}",
                                                "${report}",
                                                "Pending",
                                                "${contactPermission}",
                                                DEFAULT)`, function (err, result) {
                                                    if (err) throw err;
                                                });
                                            })
                                        })
                                    }
                                })

                                var server = message.client.guilds.cache.get('722513354303995987');
                                const channel = server.channels.cache.filter(c => c.type === 'text').find(x => x.id == "727953467443773460");
                                // var con = helpers.connectMYSQL();
                                // con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} ORDER  BY made_at DESC `, function (err, results) {
                                //     channel.send(new Discord.MessageEmbed()
                                //         .setTitle(`New case. ID: ${results[0].id}`)
                                //     );
                                // });
                            }).catch(() => {

                                embed = new Discord.MessageEmbed()
                                    .setTitle("No response received. Try submitting the report again")
                                message_.edit(embed);
                                message_.delete({ timeout: 10000 })

                            });

                    } else if (reaction.emoji.name === '❌') {
                        message_.reactions.removeAll();
                        embed = new Discord.MessageEmbed()
                            .setTitle("Cancelled");
                        message_.edit(embed);
                        message_.delete({ timeout: 10000 })
                    }
                })
                .catch(error => {
                    message_.reactions.removeAll();
                    embed = new Discord.MessageEmbed()
                        .setTitle("No response received. Try submitting the report again")
                    message_.edit(embed);
                    message_.delete({ timeout: 10000 })
                });
        })


        //     ///
        //     ///SEND CONFIRMATION
        //     ///
        //     const filter = m => m.author.id === message.author.id;
        //     await message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collectedMessage => {
        //         if (collectedMessage.first().content.toLowerCase() == "yes" || collectedMessage.first().content.toLowerCase() == "y") {

        //             ///
        //             ///CONTACT REQUEST
        //             ///
        //             embed = new Discord.MessageEmbed()
        //                 .setTitle("Contact request")
        //                 .addField("\u200b", "Do you wish to be contacted by the developers? (type yes or no) You have 30 seconds");
        //             message.channel.send(embed);


        //             message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collectedMessage2 => {
        //                 var contact = collectedMessage2.first().content.toLowerCase();
        //                 contact == "yes" || contact == "y" ? contact = "yes" : contact = "no";
        //                 var con = helpers.connectMYSQL(); // connect to the pool?
        //                 con.query(`INSERT INTO ${process.env.mysql_bug_reports_table} VALUES(NULL, "${message.author.username + '#' + message.author.discriminator}", 
        //                                                             "${message.author.id}",
        //                                                             "${report}",
        //                                                             "Pending",
        //                                                             "${contact}",
        //                                                             DEFAULT)`, function (err, result) {
        //                     if (err) throw err;
        //                 });
        //                 message.channel.send(new Discord.MessageEmbed().setTitle("Sent!"));

        //                 var server = message.client.guilds.cache.get('722513354303995987');
        //                 const channel = server.channels.cache.filter(c => c.type === 'text').find(x => x.id == "727953467443773460");

        //                 con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} ORDER  BY made_at DESC `, function (err, results) {
        //                     channel.send(new Discord.MessageEmbed()
        //                         .setTitle(`New case. ID: ${results[0].id + 1}`)
        //                     );
        //                 });
        //             })
        //         } else {
        //             // CANCEL REPORT
        //             message.channel.send(new Discord.MessageEmbed().setTitle("Report Cancelled"));
        //         }
        //     })
    }
}