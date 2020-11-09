const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'mum',
    category: 'custom',
    aliases: [],
    description: 'Go ask yer mum',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send('Go ask yer mum');
    },
};