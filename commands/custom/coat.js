const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'coat',
    category: 'custom',
    aliases: [],
    description: 'Dont forget your coat',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`I'll get my coat.`);
    },
};