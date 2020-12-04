require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();
//required
const prefix  = process.env.prefix;

module.exports = {
    name: 'ree',
    category: 'fun',
    aliases: [`reee`, `reeee`],
	description: 'REEEEEEEE',
    cooldown: 2,
    usage: ' ',
	execute(message, args) {
        message.channel.send(`REEEEEE`); 
    }
}