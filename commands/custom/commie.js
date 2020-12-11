const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'commie',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Commie.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`To the gulag!`);
    },
};