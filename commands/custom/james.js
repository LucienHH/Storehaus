const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'James',
    category: 'custom',
    aliases: [],
    description: 'jimmy',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`We need those reports James.`);
    },
};