const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'boots',
    category: 'custom',
    aliases: [],
    description: 'Boots and cats.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`AND BOOTS AND CATS AND BOOTS AND CATS AND BOOTS AND CATS AND BOOTS!`);
    },
};