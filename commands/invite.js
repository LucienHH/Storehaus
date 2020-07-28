const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'invite',
    description: 'Invite Storehaus to your server!',
    cooldown: 0,
    execute(message, args) {

        message.channel.send("Coming Soon Kappa")
    },
};