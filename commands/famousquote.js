require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'famousquote',
    description: 'Retrieve a random famous quote from history. To run, try !famousqoute',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(0).join(" ");
        fetch(`https://quote-garden.herokuapp.com/api/v2/quotes/random`)
        .then(response => response.json())
        .then(data => {             
                var quote = data.quote.quoteText
                var auothor = data.quote.quoteAuthor
                message.channel.send(`>>> ${quote} -${auothor}`);
        }
        );
        delete embed;

        return;
    }
}