const Discord = require('discord.js');
const { connect } = require('snekfetch');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'disablecmd',
    category: 'misc',
    aliases: ['cmddisable'],
    description: 'Globally disable a command from being used in the server',
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
                                message.channel.send(new Discord.MessageEmbed().setTitle("Command already blacklisted, to re-enable use `enablecmd [command name]`").setColor('#ff0000'))
                                //not blacklisted, add to blacklist
                            }else{
                                connection.query(`INSERT INTO ${process.env.mysql_disabled_commands_table} VALUES(NULL, '${element.name.toLowerCase()}', '${result_guild[0].id}' )`,function(err,result){
                                    if (err) {
                                        console.log(err);
                                    }
                                    message.channel.send(new Discord.MessageEmbed().setTitle("Command is now blacklisted, to re-enable use `enablecmd [command name]`").setColor('00ff00'))
                                })
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