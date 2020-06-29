const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'ping',
    description: 'test command!',
    cooldown: 0,
    execute(message, args) {

        message.channel.send("Kappa bot best bot, mean.. PONG!!")
    },
};