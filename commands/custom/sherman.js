const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'sherman',
    category: 'custom',
    aliases: [],
    description: 'Sherman Exp3rt',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Yo, waddup YouTube, sherman expert here! Bringing you all...another...daily...video.`);
    },
};