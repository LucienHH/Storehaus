const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'blackandfan',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Blackandfan',
    cooldown: 5,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`https://youtu.be/igaB219Ic8c`);
    },
};