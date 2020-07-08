const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'mods',
    description: 'Get the top trending mods about a game on Nexus Mods. Try !mods `name of game`!',
    cooldown: 5,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        const querystring = require('querystring')

        //If no game is provided
        if (!args.length) {
            return message.channel.send('You need to supply a search term! Try !mod `name of a game`.');
          }

        const query = querystring.stringify({ term: args.join(' ') });
        
        //GET Game trending mods by title name
        fetch(`https://api.nexusmods.com/v1/games/${args.join(' ')}/mods/trending.json}`)
            .then(response => response.json())
            .then(data => data.map( d => {
                console.log(d)
                //Store for converting sale date from epoch time
                var saleStart = new Date(d.lastChange * 1000);
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Trending Mods ${d.game_domain_name}`)
                .addField('Mod Name: ', `${d.name}`)
                .addField('Mod Summary: ', `${d.summary}`)
                .setFooter("Find more great mods at https://www.nexusmods.com")
                message.channel.send(embed);

                delete embed;
                
            }));
        return;
    }
};
