const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'gmail',
    category: 'custom',
    aliases: [],
    description: 'gmail time',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`"I'll make the Gmail" - Ed`);
    },
};