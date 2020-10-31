const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ed',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Edward.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Oh my Andrew!`);
    },
};