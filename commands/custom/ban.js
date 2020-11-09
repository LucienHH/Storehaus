const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ban',
    category: 'custom',
    aliases: [],
    description: 'banned',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Get banned Kevin`);
    },
};