const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'dj',
    category: 'custom',
    aliases: [],
    description: 'DJ Jimmy Fry!',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`This is DJ Jimmy Fry comin' at ya live from Studio 2 and - WOAH!!! Looks like someone is horsin' around!`);
    },
};