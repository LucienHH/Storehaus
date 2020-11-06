const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'twitch',
    category: 'custom',
    aliases: [],
    description: 'Custom command for TwitchingMars',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`Give me a Mountain Dew please`);
    },
};