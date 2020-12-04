const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'xyro',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Xyro',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Xyro is my name but colony is my game.`);
    },
};