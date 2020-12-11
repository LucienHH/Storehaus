const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'trout',
    category: 'custom',
    aliases: [],
    description: 'Custom command for SliperyTrout',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Get banned Kevin`);
    },
};