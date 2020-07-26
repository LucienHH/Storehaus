//Required API token
require('dotenv').config({ path: require('find-config')('.env') });
//const { get } = require('../helpers/gamespot')

const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'review',
    description: 'Get reviews about a game.  To run, type `!review name of game`',
    cooldown: 5,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        const querystring = require('querystring')

        if (game == undefined || game=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must supply a search term! Try !gamereview `name of a game`")).then(m => m.delete({timeout: 10000}));
            return;
        }

        const query = querystring.stringify({ term: args.join(' ') });
        
        //GET
        fetch(`http://www.gamespot.com/api/reviews?api_key=${process.env.gamespot_token}&format=json&limit=1&filter=title%3A${args.join(' ')}&limit=1`)
            .then(response => response.json())
            .then(data => data.results.map( d => {

                d.authors.replace("",". ");
                var good = d.good;
                var bad  = d.bad
                convertedGood = good.replace(/\|/g,". ");
                convertedBad = bad.replace(/\|/g,". ");

                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`${d.title} by ${d.authors}`)
                .addField('Good:' , `${convertedGood}`)
                .addField('Bad:' , `${convertedBad}`)
                .addField('Score:' , `${d.score}`)
                .addField('Date Published:' , `${d.publish_date}`.slice(0,-8))
                .addField(`Link to full ${d.title} : `, `${d.site_detail_url}`)

                message.channel.send(embed);

                delete embed;
                
            }));

        return;
    }
};
