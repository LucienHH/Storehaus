const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'yelling',
    category: 'custom',
    aliases: [],
    description: 'WHY ARE WE YELLING',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`K, you're yelling into the mic!`);
    },
};