const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'crunchy',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Crunchy.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Sorry, your internet is permanently unavailable. Come back never.`);
    },
};