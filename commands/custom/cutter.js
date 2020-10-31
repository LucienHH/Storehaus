const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'cutter',
    category: 'custom',
    aliases: [],
    description: 'Command for Captain Cutter.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`CUTTER V CUTTER V CUTTER V CUTTER V CUTTER V ANDERSSSSSSS!`);
    },
};