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

        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
          }

        const query = querystring.stringify({ term: args.join(' ') })
        // const query = args.join(' ')
        
        ;
        // message.channel.send(query)
        const { list } = get(`http://www.gamespot.com/api/reviews?api_key=${process.env.gamespot_token}&format=json&limit=1&filter=title%3A${query}&limit=1`, message)

        //currently failing ^
        
        if (!list.length) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
			{ name: 'name: ', value: trim(answer.filter, 1024) },
				// { name: 'Example', value: trim(answer.example, 1024) },
				// { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
			);
		message.channel.send(embed);     
    }
};
