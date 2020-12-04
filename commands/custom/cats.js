const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'cats',
    category: 'custom',
    aliases: [],
    description: 'Cats and boots.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`AND CATS AND BOOTS AND CATS AND BOOTS AND CATS AND BOOTS AND CATS AND BOOTS!`);
    },
};