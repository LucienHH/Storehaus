const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'steamdeals',
    description: 'Get deals about a game on Steam. To run, type `!steamdeals name of game`',
    cooldown: 5,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        const querystring = require('querystring')

        //If no game is provided
        if (!args.length) {
            return message.channel.send('You need to supply a search term! Try `!steamdeals name of a game`.');
          }

        const query = querystring.stringify({ term: args.join(' ') });
        
        //GET Game deals by title name
        fetch(`https://www.cheapshark.com/api/1.0/deals?title=${args.join(' ')}&storeID=1`)
            .then(response => response.json())
            .then(data => data.map( d => {
                //Store for converting sale date from epoch time
                var saleStart = new Date(d.lastChange * 1000);
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Steam deals for ${d.title}`)
                .addField('Current sale price: ', `$${d.salePrice}`)
                .addField('Normal price: ', `$${d.normalPrice}`)
                .addField("Last price change: ", saleStart.toGMTString().slice(0,-13))
                .addField("Steam user reviews:", `${d.steamRatingText} based on ${d.steamRatingCount} reviews`)
                //Cheapshark requests redirect URL
                .addField("Get this game:", `https://www.cheapshark.com/redirect?dealID=${d.dealID}`)
                message.channel.send(embed);

                delete embed;
                
            }));
        return;
    }
};
