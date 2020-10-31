const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'bacon',
    category: 'custom',
    aliases: [],
    description: 'Custom command for SirBacon8180',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Trying to think.`);
    },
};