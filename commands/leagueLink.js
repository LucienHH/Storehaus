
const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
const fetch = require('node-fetch');
// const { require } = require('find-config');
let helpers = require("../helpers/helpers")

module.exports = {
    name: 'leaguelink',
    description: 'Link a league of legends account to your Discord account',
    cooldown: 5,
    async execute(message, args) {
        let summoner = args.slice(0).join(" ");

        let con = helpers.connectMYSQL();
        con.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`,function(err,results){
            if (err) {
                console.log(err);
            }
            console.log(message.author.id)

            if (results.length == 0) {
                con.query(`INSERT INTO ${process.env.mysql_users_table} VALUES (NULL, ${message.author.id})`,function(err,results){
                    if (err) {
                        console.log(err);
                    }
                    console.log(`inserted ${message.author.id} to ${process.env.mysql_users_table}`);
                })
            }

            con.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`,function(err,results){
                con.query(`SELECT * FROM ${process.env.mysql_league_summoners_table} WHERE user_id = ${results[0]['id']}`,function(err,results_){
                    if (results_.length == 0) {
                        con.query(`INSERT INTO ${process.env.mysql_league_summoners_table} VALUES(NULL, ${results[0]['id']}, "${summoner}")`,function(err,results_){
                            if (err) {
                                message.channel.send(new Discord.MessageEmbed().setTitle(`Account linked to ${summoner}`)).then(message => message.delete({timeout: 10000}))
                            }
                        })
                    }else{
                        con.query(`UPDATE ${process.env.mysql_league_summoners_table} SET summoner_name = "${summoner}" WHERE user_id = ${results[0]['id']}`,function(err,results){
                            if (err) {
                                console.log(err);
                            }
                            message.channel.send(new Discord.MessageEmbed().setTitle(`Account link updated to ${summoner}`)).then(message => message.delete({timeout: 10000}))
                        })
                    }
                })
            })

            // con.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`,function(err,results){
            //     con.query(`INSERT INTO ${process.env.mysql_league_summoners_table} VALUES(NULL, ${results[0]['id']}, ${summoner}`,function(err,results_){
            //         // con.query(`INSERT INTO ${mysql_league_summoners_table} VALUES(NULL, ${results[0]['id']}, ${summoner}`)
            //         console.log(results[0]['id']);
            //         console.log(summoner);
            //     })
            // })

        })
    }
}