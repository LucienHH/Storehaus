const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'craig',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Craig.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`GET OUT MY ROOM I'M PLAYING MINECWAFF`);
    },
};