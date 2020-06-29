const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'about',
	description: 'Game Info Bot is a bot that queries various APIs to show the most helpful gaming information. This bot was created to help gamers discover, share, and enjoy info on their favorite games!',
	cooldown: 5,
	execute(message, args) {

        message.channel.send("This bot is made to show information about games! Made by AndyTheNerd and PatrossDev. Contribute to this project at https://github.com/AndyTheNerd/GameInfoBot/")
	},
};