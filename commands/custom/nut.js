const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'nut',
    category: 'custom',
    aliases: [],
    description: 'idk who this is for',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send('It took me 2 years to play ATN, still better than 5 years...');
    },
};