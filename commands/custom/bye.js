const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'bye',
    category: 'custom',
    aliases: [],
    description: 'See ya, James',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`See ya, James.`);
    },
};