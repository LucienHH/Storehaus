require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'starwars',
    aliases: [`starwarsquote`],
    description: 'Retrieve a random Star Wars quote! To run, try !starwars',
    cooldown: 5,
    usage: ` `,
    async execute(message, args) {
        fetch(`http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote`)
        .then(response => response.json())
        .then(data => {             
                var quote = data.starWarsQuote
                message.channel.send(`>>> ${quote}`);
        }
        );
        delete embed;

        return;
    }
}