const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require('../../helpers/helpers');
// const mongoose = require('mongoose');
// const xboxgt = require('../schemas/xboxgt.js');
const axios = require('axios');

module.exports = {
    name: 'xboxsavegt',
    category: 'gaming',
    aliases: ['savegt', 'xboxsetgt', 'setgt'],
    description: 'Saves your gamertag to the Storehaus database so you can use xbox commands without typing your gamertag. Do !savegt update <gamer_tag> to change your saved gt.',
    cooldown: 5,
    async execute(message, args) {
        let errMsg = '';
        const userID = message.author.id;

        let Gamertag = args[0];
        if (args[0].toLowerCase() === 'update') {
            Gamertag = args[1];
        } 
        else if (args[0] === undefined) {
            message.channel.send("Please provide a gamertag you wish to link to your discord account.")
            return;
        }
        const authInfo = { headers: { 'Authorization': process.env.XBOXREPLAY_AUTHORIZATION } };

        axios.get(`https://api.xboxreplay.net/players/${Gamertag.replace(/_/g, '-')}`, authInfo).then((xb1) => {

            helpers.pool.getConnection(function (err, connection) {
                if (xb1.data.gamertag) {
                    if (err) return console.log('ERROR');
                    connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${userID}`, function (err, result_user) {
                        if (err) {
                            console.log(err);
                        }
                        connection.query(`SELECT * FROM ${process.env.mysql_xbox_table} WHERE user_id = ${result_user[0].id}`, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(args[0].toLowerCase());
                            if (result.length == 0) {
                                connection.query(`INSERT INTO ${process.env.mysql_xbox_table} VALUES (NULL, ${result_user[0].id}, "${Gamertag}" )`, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    message.channel.send(`Successfully added the gamertag '${xb1.data.gamertag}' to the database and linked it to your account! If this doesn't look like your gamertag remember to replace spaces with '_'`);
                                })
                            }
                            else if (result.length == 1) {

                                if (args[0] === 'current') return message.channel.send(`Your saved gamertag is [${result[0].gamertag}] | If this isn't correct do !savegt update gamer\\_tag and remember to replace spaces with '\\_'`)

                                else if (result[0].gamertag.toLowerCase() == Gamertag.toLowerCase()) {
                                    //same
                                    message.channel.send(`You\'ve already set your gamertag to ${xb1.data.gamertag}, if you need to update it do !savegt update gamer_tag and remember to replace spaces with '\\_'`);
                                }

                                else {
                                    //not the same
                                    connection.query(`UPDATE ${process.env.mysql_xbox_table} SET gamertag = "${Gamertag}" WHERE user_id = ${result_user[0].id}`, function (err, result) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        message.channel.send(`Successfully updated your gamertag to '${xb1.data.gamertag}' and linked it to your account! If this doesn't look like your gamertag remember to replace spaces with '\\_'`);
                                    })
                                }
                            }
                        })
                    })
                }
                connection.release();
            })
        }, error => {
            if (error) errMsg = 'Error I couldn\'t find an account with that gamertag';
            helpers.sendErr(message, errMsg);
            return;
        })
    }
};