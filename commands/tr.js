const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'teamrespawn',
	aliases: ['tr', `respawn`],
	description: 'Learn more about the TeamRespawn community. To run, type `!teamrespawn',
    cooldown: 5,
    usage: ` `,
	execute(message, args) {
		let input = args.slice(0).join(" ");
		const commandName = input.toLowerCase();  

		if (commandName == undefined || input =="") {
            //message.channel.send(new Discord.MessageEmbed().setTitle("Try !help `name of a command`. To view all commands, type `!about`"));
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
			.addField(`TeamRespawn Command List`, "**Halo Wars Links** `!tr halo`\n**Social Media Links**\n `!tr links`")
			.addField(`About TeamRespawn`, "TeamRespawn is a YouTube channel and Discord that focuses on a friendly and welcoming environment in the Halo and Halo Wars games. If you love Halo, you'll love TeamRespawn. Come join the [TeamRespawn Discord server!](https://discord.com/invite/Q5vEpDj) and subscribe to the [YouTube channel](https://www.youtube.com/teamrespawntv)")
			.attachFiles('./images/TeamRespawn.jpg')
			.setImage('attachment://TeamRespawn.jpg')
            message.channel.send(embed);
            delete embed;
            return;
		}
		else if (commandName == "halo" || commandName == "halo wars" || commandName == "hw2" || commandName == "youtube" || commandName == "playlist")
        {
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle(`Halo Wars Links`)
            .addField(`Multiplayer`, "The epic series of posting the best multiplayer games we have ever played!\n [Multiplayer Playlist](https://www.youtube.com/playlist?list=PLmiI9h1x2Wr5RaM-HN7V9obHXWVJyB32-)")
            .addField(`Super Turtle`, "A series where we hold our defense for hours!\n [Super Turtle Playlist](https://www.youtube.com/playlist?list=PLmiI9h1x2Wr6SE1nJJk7PY2R_d6Y2jnqS)")
			.addField(`Mythbusters`, "Testing the strength of different units in Halo Wars!\n [HW1 Playlist](https://www.youtube.com/playlist?list=PLmiI9h1x2Wr53fc6LZ-6tGa1Jud28uEsS) and [HW2 Playlist](https://www.youtube.com/playlist?list=PLmiI9h1x2Wr4a9IVOSVzmj60jMqdBxxop)")
			.addField(`Halo Wars 2 Guide`, "Learn how to get better in Halo Wars 2!\n [Guide Playlist](https://www.youtube.com/playlist?list=PLmiI9h1x2Wr4n-GOt2bokibNRVs5sPHr2)")
			.addField(`Modding Halo Wars`, "Let's try out various mods for Halo Wars!\n [Modding Playlist](https://www.youtube.com/playlist?list=PLmiI9h1x2Wr4EEgjS9AVsl-LzcHBfRl_S)")
			.addField("Everything Else", "[See everything here!](https://teamrespawntv.com)")
            message.channel.send(embed);
            delete embed;
            return;
		}
		
		else if (commandName == "links" || commandName == "link" || commandName == "social" || commandName == "social media" || commandName =="twitter" || commandName == "patreon" || commandName == "discord")
        {
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle(`Social Media Links`)
            .addField(`YouTube`, "[YouTube Link](https://www.youtube.com/teamrespawntv)")
			.addField(`Twitter`, "[Twitter Link](https://www.twitter.com/teamrespawntv)")
			.addField(`Patreon`, "[Patreon Link](https://www.patreon.com/teamrespawn)")
			.addField(`TeamRespawn Discord`, "[Server Link](https://www.discord.teamrespawntv.com)")
			.addField(`Respawn Arcade (2nd Channel)`, "[YouTube Link](https://www.youtube.com/channel/UCqYUAo7l-BZPDRsDSQAM54Q)")
            .setFooter(`<3`)
            message.channel.send(embed);
            delete embed;
            return;
        }
	}
};	