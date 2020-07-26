const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'teamrespawn',
	description: 'Learn more about the TeamRespawn community. To run, type `!teamrespawn',
	cooldown: 5,
	execute(message, args) {
		let embed = new Discord.MessageEmbed()
		.setColor("#ff00ff")
		.addField(`TeamRespawn Community`, "TeamRespawn is a YouTube channel and Discord that focuses on a friendly and welcoming environment in the Halo and Halo Wars games. If you love Halo, you'll love TeamRespawn. Come join the [TeamRespawn Discord server!](https://discord.com/invite/Q5vEpDj) and subscribe to the [YouTube channel](https://www.youtube.com/teamrespawntv)")
		.attachFiles('./images/TeamRespawn.jpg')
		.setImage('attachment://TeamRespawn.jpg')
		message.channel.send(embed);
		delete embed;
	}
};	