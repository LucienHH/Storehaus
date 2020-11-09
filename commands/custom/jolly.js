const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'jolly',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Jolly',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`ooof.`);
    },
};