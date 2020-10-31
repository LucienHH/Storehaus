const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'clony',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Clony (Delta).',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`If the banished suck in halo infinite I'm gonna get banned`);
    },
};