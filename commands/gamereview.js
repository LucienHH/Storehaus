//Required API token
require('dotenv').config({ path: require('find-config')('.env') });
const { get } = require('../helpers/gamespot')

const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'gamereview',
    description: 'Get reviews about a game.',
    cooldown: 10000,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        const querystring = require('querystring')

        //If no game is provided
        if (!args.length) {
            return message.channel.send('You need to supply a search term! Try !gamereview `name of a game`.');
          }

        const query = querystring.stringify({ term: args.join(' ') });
        
        //GET
        fetch(`http://www.gamespot.com/api/reviews?api_key=${process.env.gamespot_token}&format=json&limit=1&filter=title%3A${args.join(' ')}&limit=1`)
            .then(response => response.json())
            .then(data => data.results.map( d => {
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`${d.title} by ${d.authors}`)
                .addField('Good :' , `${d.good}`)
                .addField('Bad:' , `${d.bad}`)
                .addField('Score:' , `${d.score}`)
                .addField('Date Published:' , `${d.publish_date}`.slice(0,-8))
                .addField(`Link to full ${d.title} : `, `${d.site_detail_url}`)

                message.channel.send(embed);

                delete embed;
                
            }));

        return;
    }
};
