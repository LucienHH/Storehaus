const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'xbox',
    aliases: [],
    description: 'A general landing page for all the Xbox commands',
    cooldown: 5,
    usage: ` `,
    async execute(message, args) {
        let embed = new Discord.MessageEmbed()
        .setColor("#ff00ff")
        .setTitle("Xbox Command List")
        .addField(`Xbox Save Gamertag`, "Save your gamertag to see your gameclips or screenshots.\n`!savegt edpeter`")
		.addField(`Xbox Avatar`, "See your Xbox Avatar or the avatar of one of your friends. \n`!xavatar slashstorm` or `!xboxavatar slashstorm`")
        .addField(`Xbox Game Clip`, "See gameclips saved on your Xbox profile!\n`!xboxgc`")
        .addField(`Xbox Screenshot`, "See screenshots saved on your Xbox profile!\n`!xboxss`")
		.setFooter(helpers.getFooter());
		message.channel.send(embed);
		delete embed;
    }
}