const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: '_case',
	description: 'View pending cases',
    cooldown: 5,
    aliases: ['case', 'report'],
	execute(message, args) {
        if (args[0] == "view") {
            message.channel.send("test");
        }
	},
};