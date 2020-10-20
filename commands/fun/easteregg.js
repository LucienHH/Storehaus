const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'easteregg',
    category: 'fun',
    aliases: [],
    description: 'Find out! To run, type `!easteregg`',
    cooldown: 5,
    usage: ` `,
    execute(message, args) {
        message.channel.send("https://cdn.discordapp.com/attachments/638153864901558282/739627902412259408/video0.mp4")
    }
}