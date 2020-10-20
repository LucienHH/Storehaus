const Discord = require('discord.js');
const { connect } = require('snekfetch');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'someone-blacklist',
    category: 'fun',
    aliases: ['somebody-blacklist'],
    description: 'Get blacklisted from `!someone`',
    cooldown: 60,
    execute(message, args) {
        helpers.pool.getConnection(async function (err, connection) {
            connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, result) {
                connection.query(`SELECT * FROM ${process.env.mysql_someone_blacklist_table} WHERE user_id = ${result[0]['id']}`, function (err, result_blacklisted) {
                    if (result_blacklisted && result_blacklisted.length == 1) {
                        message.channel.send("Already blacklisted").then(m => m.delete({ timeout: 5000 }));
                    } else {
                        connection.query(`INSERT INTO ${process.env.mysql_someone_blacklist_table} VALUES(NULL, ${result[0]['id']})`, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            message.channel.send("Blacklisted").then(m => m.delete({ timeout: 5000 }));
                        })

                    }
                })

            })
            message.delete({ timeout: 5000 });
            return;
        })

    }
};