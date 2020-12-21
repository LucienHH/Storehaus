const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'live',
    category: 'custom',
    aliases: [`thomas`],
    description: 'We are doing it live',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`WE'RE DOING IT LIVE!`);
    },
};