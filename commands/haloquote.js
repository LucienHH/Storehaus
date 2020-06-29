const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'haloquote',
    description: 'Send a line of dialogue from the Halo series! Quotes are picked at random.',
    cooldown: 0,
    execute(message, args) {
        var quoteList = ["Halo Lines Go Here!"];
		var quote = Math.floor(Math.random() * quoteList.length);
		message.channel.send(quoteList[quote]);
    },
};