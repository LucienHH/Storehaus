const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'you',
    category: 'custom',
    aliases: [],
    description: `That right there, that's on you.`,
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`That right there, that's on you.`);
    },
};