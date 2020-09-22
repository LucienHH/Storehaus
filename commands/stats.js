require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'stats',
    description: 'See stats about Storehaus',
    cooldown: 5,
    async execute(message, args) {
    // First we use guild.members.fetch to make sure all members are cached
        var servers = message.client.guilds.cache.size;
        var channels = message.client.channels.cache.size;
        var users = message.client.users.cache.size
        // message.channel.send(`Servers: ${servers}`)
        // message.channel.send(`Channels: ${channels}`)
        let embed = new Discord.MessageEmbed()
        .setColor("#ff00ff")
        .addField(`Stats`,`Servers: ${servers}\n Channels: ${channels}\n Users: ${users}`)
        message.channel.send(embed);
        
    }

}