const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'support',
    category: 'misc',
    aliases: [],
    description: 'Get an invite to the Storehaus support server!',
    cooldown: 0,
    usage: ` `,
    execute(message, args) {

        message.channel.send("https://discord.gg/urfmc8z")
    },
};