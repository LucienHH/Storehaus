require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'math',
    aliases: [],
    description: 'See some nerdy facts with numbers, math, and dates! To run, try !math',
    cooldown: 5,
    usage: ` `,
    async execute(message, args) {
        var request = require('request');// need this for below to work 
        var array = [`http://numbersapi.com/random/year`, `http://numbersapi.com/random/trivia`, `http://numbersapi.com/random/date`, `http://numbersapi.com/random/math`]
        var url = array[Math.floor(Math.random() * array.length)];
        
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
            message.channel.send(`>>> ${data}`)
            }
        });
    }
}