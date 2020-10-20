const Discord = require('discord.js');
const { connect } = require('snekfetch');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'someone-whitelist',
    category: 'fun',
    aliases: ['somebody-whitelist'],
    description: 'Removes you from the !someone blacklist so that you can get randomly pinged again.',
    cooldown: 60,
    execute(message, args) {
        //grab a non bot user
        let users = message.guild.members.cache.filter(f => f.user.bot === false);

        let randomUser = users.random();
        helpers.pool.getConnection(async function (err, connection) {

                connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`,function(err,result){
                    connection.query(`SELECT * FROM ${process.env.mysql_someone_blacklist_table} WHERE user_id = ${result[0]['id']}`,function(err,result_blacklisted){
                        if (result_blacklisted && result_blacklisted.length == 1) {
                            connection.query(`DELETE FROM ${process.env.mysql_someone_blacklist_table} WHERE user_id = ${result[0]['id']}`,function(err,result){
                                if (err) {
                                    console.log(err);
                                }
                                message.channel.send("Removed from blacklist sucessfully.").then(m => m.delete({timeout: 5000}));
                            });
                        }else{
                            message.channel.send("You're already whitelisted, get ready to get pinged!").then(m => m.delete({timeout: 5000}));
                        }
                    })
                })
                message.delete({timeout: 5000});
                return;
            
        })

    }
};