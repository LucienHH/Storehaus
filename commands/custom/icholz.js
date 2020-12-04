const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'icholz',
    category: 'custom',
    aliases: [],
    description: `Custom command for iCholz`,
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`omg`);
    },
};