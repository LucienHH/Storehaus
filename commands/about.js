const Discord = require('discord.js');
const helpers = require('../helpers/helpers');
const client = new Discord.Client();
module.exports = {
	name: 'about',
	description: 'Storehaus is a bot that queries various APIs to enhance your discord server. This bot was created to help gamers discover, share, and enjoy info on their favorite games! To run, type `!about',
	cooldown: 5,
	execute(message, args) {

		//message.channel.send("This bot is made to show information about games! Made by AndyTheNerd and PatrossDev. Contribute to this project at https://github.com/AndyTheNerd/GameInfoBot/")
		let embed = new Discord.MessageEmbed()
		.setColor("#ff00ff")
		.addField(`Storehaus: A Gaming Info Bot`, " [Invite Storehaus to your server!](https://discordapp.com/oauth2/authorize?client_id=736204347171405904&scope=bot&permissions=8)\n \nStorehaus is a gaming info bot designed to help you learn and enhance your gaming experience. Storehaus can grab game reviews, information, sales, playtime, and more! This bot is open source, so you can check out the code of Storehaus and contribute to it [here](https://github.com/AndyTheNerd).\n \nThe default prefix for Storehaus is `!` and you can change it with `!setprefix`")
		.addField(`Gaming Commands`,"`!achievements`, `!compat`, `!dlc` `!gameinfo`, `!gamesub`, `!gogdeals`, `!goty`, `!halopedia`, `!haloquote`, `!playtime`, `!playanywhere`, `!psnow`, `!review`, `!screenshot`, `!series`, `!steamdeals`, `!stores`, `!xbl`")
		.addField(`Humor and Misc. Commands`, "`!cat`, `!chuck`, `!dadjoke`, `!dog`, `!gif`, `!insult`, `!mars`, `!meme`, `!nasa`, `!teamrespawn`, `!trivia`, `!weather`")
		.addField(`Support Comands`, "`!about`, `!help`, `!invite`, `!feedback`")
		.addField(`Help`, "To learn how to use a particular command, type `!help [name of a command]`")
		.addField(`TeamRespawn`, "If you love Halo or Halo Wars, come join the [TeamRespawn Discord server!](https://discord.com/invite/Q5vEpDj)")
		.addField(`Support`, "Need help? Join the [support server.](https://discord.gg/nvNQQ2f) Feeling generous? [Buy us a coffee.](https://ko-fi.com/andythenerd)")
		.setFooter(helpers.getFooter());
		message.channel.send(embed);
		delete embed;
	}
};