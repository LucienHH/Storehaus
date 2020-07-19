const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'insult',
    description: 'A random insult generator. To run, type `!insult`',
    cooldown: 5,
    async execute(message, args) {
        var request = require('request');// need this for below to work 
        
        var url = 'https://insult.mattbas.org/api/insult';
        
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
          }, (err, res, data) => {
            if (err) {
              console.log('Error:', err);
            }
            else {
              // data is already parsed as JSON:
              message.channel.send(data)
            }
        });
    },
};