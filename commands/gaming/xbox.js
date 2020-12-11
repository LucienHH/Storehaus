const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../../helpers/helpers');

module.exports = {
    name: 'xbox',
    category: 'gaming',
    aliases: [],
    description: 'A general landing page for all the Xbox commands',
    cooldown: 5,
    usage: ` `,
    async execute(message, args) {
        let embed = new Discord.MessageEmbed()
        .setColor("#ff00ff")
        .setTitle("Xbox Command List")
        .addField(`Check Achievement Unlocks`, "See if you have unlocked an achievement or not!\n`!check slashstorm` then enter game ID and achievement ID seperated by a space.\n\nExample:`!check slashstorm`, then `1667928394 61`.\n\nYou can discover the GameID and Achievement ID by using `!xachievement` command.")
        .addField(`Xbox Achievements`, "See the achievements you've unlocked!\n `!xachievement slashstorm`")
        .addField(`Xbox Save Gamertag`, "Save your gamertag to see your gameclips or screenshots.\n`!savegt edpeter`")
		.addField(`Xbox Avatar`, "See your Xbox Avatar or the avatar of one of your friends. \n`!xavatar slashstorm` or `!xboxavatar slashstorm`")
        .addField(`Xbox Game Clip`, "See gameclips saved on your Xbox profile!\n`!xboxgc`")
        .addField(`Xbox Screenshot`, "See screenshots saved on your Xbox profile!\n`!xboxss`")
        .addField(`No Context Xbox Live Memes`, "See memes from the No Context Xbox Live subreddit\n`!xbl`")
		.setFooter(helpers.getFooter());
		message.channel.send(embed);
		delete embed;
    }
}