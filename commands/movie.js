require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'movie',
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

        fetch(`https://api.nytimes.com/svc/moviesreview/v2/reviews/search.json?query=${args.join(' ')}&api-key=${process.env.ny_times}`)
        .then(response => response.json())
        .then(data => {             
                var movieName = data.results.display_title
                console.log(movieName)
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField(`Movie Information for ${movieName}`, `MPAA Rating:`)
                .setFooter(helpers.getFooter());
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}