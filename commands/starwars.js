require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'starwars',
    description: 'Retrieve a random Star Wars quote! To run, try !starwars',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(0).join(" ");
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