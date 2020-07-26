const Discord = require('discord.js');
const client = new Discord.Client();
//const botStats = require('../helpers/stats')
module.exports = {
	name: 'stats',
	description: 'Storehaus is a bot that queries various APIs to enhance your discord server. This bot was created to help gamers discover, share, and enjoy info on their favorite games! To run, type `!about',
	cooldown: 5,
	execute(message, args) {
    console.log(botStats)

    let embed = new Discord.MessageEmbed()
    .setColor("#ff00ff")
    .setTitle("Bot Stats:")
    .addField(`Number of Servers`, `${client.guilds.cache.size}`)
    .setFooter("Storehaus v 1.0.0 Made with <3 from AndyTheNerd and PatrossDev.");
    message.channel.send(embed);
    delete embed;
    }
};