const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'firefox',
    category: 'custom',
    aliases: [],
    description: `Custom command for Firefox`,
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`www.getfirefox.com`);
    },
};