const Discord = require('discord.js');
const { connect } = require('snekfetch');
const helpers = require('../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'someone',
    aliases: ['somebody'],
    description: 'Ping a random person! To get blacklisted use `!someone blacklist`, to whitelist yourself again do `!someone whitelist`. Formerly the main feature of KappaBot. [*]',
    cooldown: 7200,
    execute(message, args) {
        //grab a non bot user
        let users = message.guild.members.cache.filter(f => f.user.bot === false);

        let randomUser = users.random();
        helpers.pool.getConnection(async function (err, connection) {
            connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${randomUser.id}`, function (err, results) {
                connection.query(`SELECT * FROM ${process.env.mysql_someone_blacklist_table} where user_id = ${results[0].id}`, function (err, results_) {
                    if (results_.length == 1) {
                        message.channel.send(`Blacklisted user: ${randomUser.user.username}#${randomUser.user.discriminator}`);
                    } else {
                        message.channel.send(`<@${randomUser.id}>`);
                    }
                })
            })


            connection.release();
        })

    }
};