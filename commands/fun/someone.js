const Discord = require('discord.js');
const { connect } = require('snekfetch');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'someone',
    category: 'fun',
    aliases: ['somebody'],
    description: 'Ping a random person! To get blacklisted use `!someone blacklist`, to whitelist yourself again do `!someone whitelist`. Formerly the main feature of KappaBot. [*]',
    // cooldown: 7200,
    cooldown: 7200,
    usage: `!someone`,
    execute(message, args) {
        //grab a non bot user
        message.guild.members.fetch({ force: true }).then(member => {
            const filteredUser = member.filter(f => f.user.bot === false);
            const randomUser = filteredUser.random();

            helpers.pool.getConnection(async function (err, connection) {
                connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${randomUser.id}`, function (err, user_result) {
                    if (user_result == undefined) {
                        connection.query(`INSERT INTO ${process.env.mysql_users_table} VALUES (NULL, ${randomUser.id})`)
                    } else if (user_result == 0) {
                        connection.query(`INSERT INTO ${process.env.mysql_users_table} VALUES (NULL, ${randomUser.id})`)
                    } else {
                        //nothing
                    }
                })


                connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${randomUser.id}`, function (err, result) {
                    // console.log(result);
                    connection.query(`SELECT * FROM ${process.env.mysql_someone_blacklist_table} where user_id = ${result[0].id}`, function (err, results_) {
                        if (results_ && results_.length == 1) {
                            message.channel.send(`Blacklisted user: ${randomUser.user.username}#${randomUser.user.discriminator}`);
                        } else {
                            message.channel.send(`<@${randomUser.id}>`);
                            console.log(randomUser.user.username);
                        }
                    })
                })


                connection.release();
            })
        });

    }
};