const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'dadjoke',
    description: 'Dad joke lol',
    cooldown: 5,
    async execute(message, args) {
        const { file } = await fetch('https://icanhazdadjoke.com/', {
            method: 'GET',
            headers: {
              'accept': 'text/plain'
            }
          });
        
        message.channel.send(file);
        return;
    },
};