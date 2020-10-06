const Discord = require('discord.js');
const helpers = require('../helpers/helpers');
const client = new Discord.Client();
module.exports = {
	name: 'about',
	aliases: [],
	description: 'Storehaus is a bot that queries various APIs to enhance your discord server. This bot was created to help gamers discover, share, and enjoy info on their favorite games!',
	usage: ` `,
	cooldown: 10,
	execute(message, args) {
		let embed = new Discord.MessageEmbed()
		.setColor("#ff00ff")
		.addField(`Storehaus: A Gaming Info Bot`, "[Invite Storehaus to your server!](https://discord.com/oauth2/authorize?client_id=736204347171405904&scope=bot&permissions=379968)\n \nStorehaus is a gaming info bot designed to help you learn and enhance your gaming experience.\n \nThe default prefix for Storehaus is `!` and you can change it with `!setprefix`")
		.addField(`Command Categories`, "Gaming, Humor, Misc, Help, TeamRespawn. Discover the commands in each category by saying `!help`")
		.addField(`TeamRespawn`, "If you love Halo or Halo Wars, come join the [TeamRespawn Discord server!](https://discord.com/invite/Q5vEpDj)")
		.addField(`Support`, "Need help? [Join the support server](https://discord.gg/urfmc8z) Feeling generous? [Buy us a coffee.](https://ko-fi.com/andythenerd)")
		.setFooter(helpers.getFooter());
		message.channel.send(embed);
		delete embed;
	}
};