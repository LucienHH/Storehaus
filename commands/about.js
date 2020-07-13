const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'about',
	description: 'Game Info Bot is a bot that queries various APIs to show the most helpful gaming information. This bot was created to help gamers discover, share, and enjoy info on their favorite games!',
	cooldown: 5,
	execute(message, args) {

		//message.channel.send("This bot is made to show information about games! Made by AndyTheNerd and PatrossDev. Contribute to this project at https://github.com/AndyTheNerd/GameInfoBot/")
		let embed = new Discord.MessageEmbed()
		.setColor("#ff00ff")
		.addField(`Storehaus: A Gaming Info Bot`, " [Add Storehaus to your server!](https://discordapp.com/oauth2/authorize?client_id=725749175282696194&scope=bot&permissions=8) Storehaus is a gaming info bot designed to help you learn and enhance your gaming experience. Storehaus can grab game reviews, information, sales, playtime, and more! This bot is open source, so you can check out the code of Storehaus and contribute to it [here](https://github.com/AndyTheNerd).")
		.setFooter("Made with <3 from AndyTheNerd and PatrossDev.");
		message.channel.send(embed);
		delete embed;
	}
};