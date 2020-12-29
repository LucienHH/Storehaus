const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'bean',
    category: 'custom',
    aliases: [],
    description: 'Rage',
    cooldown: 5,
    usage: ` `,
    execute(message, args) {
        let array = [`https://cdn.discordapp.com/attachments/638153864901558282/739627902412259408/video0.mp4`, `https://cdn.discordapp.com/attachments/371258581351399424/793524116120403978/video0.mp4`]
        const random = Math.floor(Math.random() * array.length);
        message.channel.send(array[random]);
    },
};