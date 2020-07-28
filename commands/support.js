const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'support',
    description: 'Get an invite to the Storehaus support server!',
    cooldown: 0,
    execute(message, args) {

        message.channel.send("Coming Soon Kappa")
    },
};