const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'wick',
    category: 'custom',
    aliases: [],
    description: 'Wick',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`You are getting right on my wick, friend.`);
    },
};