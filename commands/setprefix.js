const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
const fetch = require('node-fetch');
// const { require } = require('find-config');
let helpers = require("../helpers/helpers")

module.exports = {
    name: 'setprefix',
    description: 'Set global prefix for the guild.',
    cooldown: 5,
    async execute(message, args) {

        if (args[0] == "" || args[0] == null) {
            message.channel.send("You need to provide a prefix in order to change it.");
        } else if (args[0].length != 1) {
            message.channel.send("The prefix must be 1 character long.")
        } else {
            let con = helpers.connectMYSQL();
            con.query(`SELECT id FROM ${process.env.mysql_guilds_table} where guild_id= ${message.guild.id}`, function (err, results) {
                let guildID = results[0]['id'];
                console.log(guildID);
                con.query(`SELECT * FROM ${process.env.mysql_prefixes_table} WHERE guild_id = ${guildID}`, function (err, results_) {
                    if (results_.length == 1) {
                        //modify prefix 
                        con.query(`UPDATE ${process.env.mysql_prefixes_table} SET prefix = "${args[0]}" WHERE guild_id = ${guildID} `, function () {
                            message.channel.send(new Discord.MessageEmbed().setTitle("The guild's prefix has been updated")).then(message => message.delete({timeout: 5000}));
                        });
                    } else {
                        con.query(`INSERT INTO ${process.env.mysql_prefixes_table} VALUES (NULL, ${guildID}, "${args[0]}")`, function () {
                            message.channel.send(new Discord.MessageEmbed().setTitle("The guild's prefix has been updated")).then(message => message.delete({timeout: 5000}));
                        })
                    }
                })
            })

        }
    },
};