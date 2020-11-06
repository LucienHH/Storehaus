require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();
//required
const prefix  = process.env.prefix;

module.exports = {
    name: 'uwu',
    category: 'fun',
    aliases: [`owo`, `uvu`],
	description: 'UwU',
    cooldown: 2,
    usage: ' ',
	execute(message, args) {
        let uwu = ['https://tenor.com/view/egoz-uwu-uwu-army-dance-party-gif-15090789', 'https://tenor.com/view/owo-uwu-star-gif-14444240', 'https://tenor.com/view/uwu-owo-gif-gif-13537412', 'https://tenor.com/view/uwu-anime-emoji-eyes-emote-gif-15264553', 'https://tenor.com/view/possibly-people-uwu-ornanolog-ornanologuwu-thim-uwu-gif-15696646', 'https://tenor.com/view/uw-u-kawai-pixel-art-gif-18479273', 'https://tenor.com/view/uwu-cat-piano-music-tiles-tapping-gif-16391139', 'https://tenor.com/view/egoz-uwu-uwu-army-dance-party-gif-15090789']
        var owo = Math.floor(Math.random() * uwu.length);
        message.channel.send(uwu[owo]); 
    }
}