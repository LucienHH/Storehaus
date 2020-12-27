const Discord = require('discord.js');
const { connect } = require('snekfetch');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'enablecmd',
    category: 'misc',
    aliases: ['cmdenable'],
    description: 'Re-enable a command to be used in the server again',
    usage: ` `,
    cooldown: 10,
    execute(message, args, client) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            
            message.channel.send(new Discord.MessageEmbed().setTitle("Missing permissions, `MANAGE_CHANNELS` required.").setColor('ff0000'))
            return;
        }
        helpers.pool.getConnection(function(err,connection){
            const cmd = client.commands
            if (args[0] == null || args[0] == undefined || args[0] == "") {
                console.log("missing args!");
                return;
            }
            cmd.forEach(element => {
                if (element.name.toLowerCase() === args[0].toLowerCase()) {
                    //get guild#
                    connection.query(`select * from ${process.env.mysql_guilds_table} where guild_id = ${message.guild.id}`,function(err,result_guild){
                        if (err) {
                            console.log(err);
                            return;
                        }
                        //check if command is already blacklisted in the server
                        connection.query(`SELECT * FROM ${process.env.mysql_disabled_commands_table} WHERE command_name = '${element.name.toLowerCase()}' AND guild_id = '${result_guild[0].id}'`,function(err,result_command){
                            if (err) {
                                console.log(err);
                                return;
                            }
                            // already blacklisted
                            if (result_command.length == 1) {
                                connection.query(`DELETE FROM ${process.env.mysql_disabled_commands_table} WHERE command_name = '${element.name.toLowerCase()}' AND guild_id = '${result_guild[0].id}'`,function(err,result_disabledcmd){
                                    if (err) {
                                        console.log(err);
                                    }
                                })
                                message.channel.send(new Discord.MessageEmbed().setTitle("Command re-enabled").setColor('#00ff00'))
                                //not blacklisted, add to blacklist
                            }else{

                                message.channel.send(new Discord.MessageEmbed().setTitle("Command is already enabled, to disable use `disablecmd [command name]`").setColor("ff0000"))
                            }

                        })
                    })

                } else {
                }
            })
            connection.release();
        })
    }
};