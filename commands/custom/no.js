const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'no',
    category: 'custom',
    aliases: [],
    description: 'No u',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send('No u');
    },
};