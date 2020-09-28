const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require('../helpers/helpers');
const mongoose = require('mongoose');
const xboxgt = require('../schemas/xboxgt.js');
const axios = require('axios');

module.exports = {
    name: 'savegt',
    description: 'Saves your gamertag to the Storehaus database so you can use xbox commands without typing your gamertag. Do !savegt update <gamer_tag> to change your saved gt.',
    cooldown: 5,
    async execute(message, args) {
        let errMsg = '';
        const memberId = message.author.id;

        let Gamertag = args[0];
        if (args[0].toLowerCase() === 'update') {
            Gamertag = args[1];
        }
        const authInfo = { headers: { 'Authorization': process.env.XBOXREPLAY_AUTHORIZATION } };

        axios.get(`https://api.xboxreplay.net/players/${Gamertag.replace(/_/g, '-')}`, authInfo).then((xb1) => {

            if (xb1.data.gamertag) {
                xboxgt.findOne({ userID: memberId }, (err, gt) => {
                    if (err) return console.log('ERROR');
                    if (!gt) {
                        const newgt = new xboxgt({
                            _id: mongoose.Types.ObjectId(),
                            userID: memberId,
                            userName: message.author.username,
                            gt: xb1.data.gamertag,
                        });
                        newgt.save();
                        message.channel.send(`Successfully added the gamertag '${xb1.data.gamertag}' to the database and linked it to your account!`);
                    }
                    else if (args[0].toLowerCase() === 'update') {
                        if ((gt.gt).toLowerCase() === xb1.data.gamertag.toLowerCase()) return message.channel.send(`You\'ve already set your gamertag to ${gt.gt}, if you need to update it do !savegt update gamer_tag`);
                        gt.gt = xb1.data.gamertag;
                        gt.save();
                        message.channel.send(`Successfully updated your gamertag to '${xb1.data.gamertag}' and linked it to your account!`);
                    }
                    else message.channel.send(`You\'ve already set your gamertag to ${gt.gt}, if you need to update it do !savegt update gamer_tag`);
                });
            }
        }, error => {
            if (error) errMsg = 'Error I couldn\'t find an account with that gamertag';
            helpers.sendErr(message, errMsg);
            return;
        })
    }
};