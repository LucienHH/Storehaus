require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../../helpers/helpers');
const { log } = require('console');

module.exports = {
    name: 'movie',
    category: 'fun',
    aliases: [],
    description: 'Retrieve movie information! To run, try !movie [name of a movie]',
    cooldown: 5,
    async execute(message, args) {
        let moviereview = args.slice(0).join(" ");
        const querystring = require('querystring')

        if (moviereview == undefined || moviereview=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must supply a search term! Try !moviereview `name of a movie`")).then(m => m.delete({timeout: 10000}));
            return;
        }

        const query = querystring.stringify({ term: args.join(' ') });

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${args.join(' ')}&api-key=${process.env.ny_times}`)
        .then(response => response.json())
        .then(data => {         
            
            // data.results.forEach(element => {
            //     // console.log(element.display_title);
            // });
            console.log(data);
                var movieName = data.display_title
                console.log(data.display_title)
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField(`Movie Information for ${data.results[0].display_title}`, `MPAA Rating: ${data.results[0].mpaa_rating}`)
                .addField("Short summary: ", data.results[0].summary_short)
                .addField("Publication date: ", data.results[0].publication_date)
                .setFooter(helpers.getFooter());
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}