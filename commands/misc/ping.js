const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'ping',
    category: 'misc',
    aliases: [],
    description: 'test command!',
    cooldown: 0,
    usage: ` `,
    execute(message, args) {

        // message.channel.send("Kappa bot best bot, I mean.. PONG!!")
        message.channel.send('Ping?').then(m =>
            m.edit(`Discord API: ${m.createdTimestamp - message.createdTimestamp}ms.`));
    },
};