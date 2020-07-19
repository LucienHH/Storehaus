const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'chuck',
    description: 'Of course we need Chuck Norris jokes. To run, type `!chuck`',
    cooldown: 5,
    async execute(message, args) {
        var request = require('request');// need this for below to work 
        
        var url = 'http://api.icndb.com/jokes/random';
        
        request.get({
            url: url,
            json: true,
          }, (err, res, data) => {
            if (err) {
              console.log('Error:', err);
            }
            else {
            console.log(data)
              // data is already parsed as JSON:
            message.channel.send(data.value.joke)
            }
        });
    },
};