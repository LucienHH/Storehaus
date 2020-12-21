const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'stormy',
    category: 'custom',
    aliases: [],
    description: 'Cutom command for Stormy',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`I need a drink.`);
    },
};