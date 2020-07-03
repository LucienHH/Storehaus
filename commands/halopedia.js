const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'halopedia',
    description: 'Get deals about a game on Steam. Try !steamdeals `name of game`!',
    cooldown: 5,
    async execute(message, args) {
        
        let embed = new Discord.MessageEmbed()
        .setColor("#ff00ff")
        .setTitle(`Articles for Halopedia`)
        fetch(`https://www.halopedia.org/api.php?list=random&action=query&format=json&rnlimit=5&rnnamespace=0`)
            .then(response => response.json())
            .then(data => data.results.map( d => {
                embed.addField("Title:", `${d.title}`)
            }));
            delete embed;

        return;
    }
};
