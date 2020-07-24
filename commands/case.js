const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require("../helpers/helpers")
module.exports = {
	name: '_case',
	description: 'View pending cases',
    cooldown: 5,
    aliases: ['case', 'report'],
	execute(message, args) {
        if (message.author.id != 327865732681433098 && message.author.id != 273654494829477888) {
            return message.channel.send(new Discord.MessageEmbed().setTitle("You do not have the sufficient permissions to use this command.")).then(m => m.delete({timeout: 10000}));
            
        }
        if (args[0].toLowerCase() == "view") {
           if(args[1]==null){
               message.channel.send(`Please choose one of the following options:
               \nExample: *case view [option]\n
               \n**Open** - Shows 10 oldest open cases
               \n**Pending** - Shows 10 oldest unopened cases
               \n**All** - shows 10 oldest (not closed) cases
               \n**Close** - closes specific case
               \n**ID** - opens full details about specific case (Viewing specific case changes status to **Open**)`);
               
           }else{
               switch (args[1].toLowerCase()) {
                    case "open":
                        {
                            var con = helpers.connectMYSQL();
                            con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} WHERE status = 'Open'ORDER BY made_at ASC LIMIT 10`,function(err,results){
                                let embed = new Discord.MessageEmbed()
                                if(results.length == 0){
                                    embed.setTitle("No open cases");
                                    message.channel.send(embed);
                                    return;
                                }
                                for (let i = 0; i < results.length; i++) {
                                    embed.addField(`ID: ${results[i].id}`,`Made by: ${results[i].user_name}`); 
                                }
                                message.channel.send(embed);
                            });
                        }
                    break;
                    case "pending":
                        {
                            var con = helpers.connectMYSQL();
                            con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} WHERE status = 'Pending'ORDER BY made_at ASC LIMIT 10`,function(err,results){
                                let embed = new Discord.MessageEmbed()
                                if(results.length == 0){
                                    embed.setTitle("No Pending cases");
                                    message.channel.send(embed);
                                    return;
                                }
                                for (let i = 0; i < results.length; i++) {
                                    embed.addField(`ID: ${results[i].id}`,`Made by: ${results[i].user_name}`); 
                                }
                                message.channel.send(embed);
                            });
                        }
                    break;
                    case "all":
                        {
                            var con = helpers.connectMYSQL();
                            con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} WHERE status NOT LIKE 'Closed' ORDER BY made_at ASC LIMIT 10`,function(err,results){
                                let embed = new Discord.MessageEmbed()
                                if(results.length == 0){
                                    embed.setTitle("No cases");
                                    message.channel.send(embed);
                                    return;
                                }
                                for (let i = 0; i < results.length; i++) {
                                    embed.addField(`ID: ${results[i].id}`,`Made by: ${results[i].user_name}`); 
                                }
                                message.channel.send(embed);
                            });
                        }
                    break;
                    case "closed":
                        {
                            var con = helpers.connectMYSQL();
                            con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} WHERE status = 'Closed'ORDER BY made_at ASC LIMIT 10`,function(err,results){
                                let embed = new Discord.MessageEmbed()
                                if(results.length == 0){
                                    embed.setTitle("No closed cases");
                                    message.channel.send(embed);
                                    return;
                                }
                                for (let i = 0; i < results.length; i++) {
                                    embed.addField(`ID: ${results[i].id}`,`Made by: ${results[i].user_name}`); 
                                }
                                message.channel.send(embed);
                            });
                        }
                    break;
                    case "id":
                        {
                            var con = helpers.connectMYSQL();
                            con.query(`SELECT * FROM ${process.env.mysql_bug_reports_table} WHERE id = ${args[2]} ORDER BY made_at ASC LIMIT 10`,function(err,results){
                                let embed = new Discord.MessageEmbed()
                                .setTitle("Report by " + results[0].user_name + " ("+results[0].user_id+")")
                                .addField(`Permission to contact`,results[0].contact_permission)
                                .addField(`Status`,results[0].status)
                                .addField('Report Content', results[0].report)
                                .setFooter(`Report made at: ${results[0].made_at}`)
                                message.channel.send(embed);
                            });

                            con.query(`UPDATE ${process.env.mysql_bug_reports_table} SET status = "Open" WHERE id = ${args[2]}`,function(err,results){
                            })
                        }
                    break;
               
                    default:
                        {
                            message.channel.send(`[${args[1]}] is not a valid option`)
                        }
                    break;
               }
           }
        }else if(args[0].toLowerCase() == "close"){
            var con = helpers.connectMYSQL();
            con.query(`UPDATE ${process.env.mysql_bug_reports_table} SET status = "Closed" WHERE id = ${args[1]}`);
            message.channel.send(new Discord.MessageEmbed().setTitle("Closed Case id " + args[1]))
        }else if(args[0].toLowerCase() == "delete"){
            var con = helpers.connectMYSQL();
            con.query(`DELETE FROM ${process.env.mysql_bug_reports_table} WHERE id = ${args[1]}`);
            message.channel.send(new Discord.MessageEmbed().setTitle("Deleted Case id " + args[1]))
        }
	},
};