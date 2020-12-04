const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'dango',
    category: 'custom',
    aliases: [],
    description: 'Dangos.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`You are a Dango, friend.`);
    },
};