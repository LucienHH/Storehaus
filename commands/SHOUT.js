require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();
//required
const prefix  = process.env.prefix;

module.exports = {
    name: 'shout',
    aliases: [`yell`, `scream`],
	description: 'THIS WILL SHOUT WHATEVER YOU SAY. IT IS VERY LOUD',
    cooldown: 2,
    usage: '[command name]',
	execute(message, args) {
        let input = args.slice(0).join(" ");
        const YELL = input.toUpperCase(); 
        message.channel.send(`>>> ${YELL}`); 
    }
}