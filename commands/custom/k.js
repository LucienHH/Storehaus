const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'k',
    category: 'custom',
    aliases: [],
    description: 'K',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`I'll respond with K to that.`);
    },
};