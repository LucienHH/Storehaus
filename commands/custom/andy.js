const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'andy',
    category: 'custom',
    aliases: [],
    description: 'No u',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Andy, Bo-Bandy, Co-Candy, Do-Dandy... Oh Andy!`);
    },
};