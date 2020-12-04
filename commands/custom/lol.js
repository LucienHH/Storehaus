const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'lol',
    category: 'custom',
    aliases: [`lel`],
    description: 'Lollington, Edington',
    cooldown: 5,
    usage: ` `,
    execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed()
        .attachFiles(['./images/lol.jpg'])
        .setImage('attachment://lol.jpg');
    message.channel.send(exampleEmbed);
    
    },
};