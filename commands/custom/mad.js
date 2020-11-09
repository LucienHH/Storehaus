const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'mad',
    category: 'custom',
    aliases: [],
    description: 'getting mad?',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send('Getting mad yet?');
    },
};