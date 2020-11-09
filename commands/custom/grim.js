const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'grim',
    category: 'custom',
    aliases: [],
    description: `Custom command for Grim`,
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`ℜ𝔢𝔪 𝔦𝔰 𝔟𝔢𝔰𝔱 𝔤𝔦𝔯𝔩`);
    },
};