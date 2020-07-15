const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require("../helpers/helpers")

var mysql = require('mysql');
module.exports = {
    name: 'bugreport',
    description: 'Report a bug to the developers',
    cooldown: 5,
    async execute(message, args) {
        let report = await args.slice(0).join(" ");
        if (report.length < 20) {
            let embed = await new Discord.MessageEmbed()
                .setTitle("Your report is too shortm needs to be at least 20 characters");
                message.channel.send(embed);
                return;
        }
        let embed = await new Discord.MessageEmbed()
        .setTitle("You are about to send the following message:")
        .setDescription(report)
        .addField("\u200b","Are you sure you want to send it? (type yes or no) You have 10 seconds")
        await message.channel.send(embed);
        
        ///
        ///SEND CONFIRMATION
        ///
        const filter = m => m.author.id === message.author.id;
        await message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collectedMessage => {
            if (collectedMessage.first().content.toLowerCase() == "yes" || collectedMessage.first().content.toLowerCase() == "y") {

                ///
                ///CONTACT REQUEST
                ///
                embed = new Discord.MessageEmbed()
                .setTitle("Contact request")
                .addField("\u200b","Do you wish to be contacted by the developers? (type yes or no) You have 10 seconds");
                message.channel.send(embed);
                
                
                message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collectedMessage2 => {
                    var contact = collectedMessage2.first().content.toLowerCase();
                    contact=="yes" || contact=="y"?contact="yes":contact="no"; 
                var con = helpers.connectMYSQL(); // connect to the pool?
                con.query(`INSERT INTO ${process.env.mysql_bug_reports_table} VALUES(NULL, "${message.author.username + '#' + message.author.discriminator}", 
                                                                "${message.author.id}",
                                                                "${report}",
                                                                "Pending",
                                                                "${contact}",
                                                                DEFAULT)`, function (err, result) {
                    if (err) throw err;
                });
                message.channel.send(new Discord.MessageEmbed().setTitle("Sent!"));

                var server = message.client.guilds.cache.get('722513354303995987');
                const channel = server.channels.cache.filter(c => c.type === 'text').find(x => x.id == "727953467443773460");

                con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} ORDER  BY made_at DESC `, function (err,results){
                    channel.send(new Discord.MessageEmbed()
                    .setTitle(`New case. ID: ${results[0].id + 1}`)
                    );
                });
            })
            }else{
                // CANCEL REPORT
                message.channel.send(new Discord.MessageEmbed().setTitle("Report Cancelled"));
            }
        })
    }
}