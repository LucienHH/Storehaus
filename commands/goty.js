const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'goty',
    description: 'Learn something new about gaming!',
    cooldown: 5,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        //GET
        //Test query below
        let embed = new Discord.MessageEmbed()
        .setColor("#ff00ff")
        .setTitle("GOTY CONTENDERS [insert year here]")

        var y = 0; // used as counter for data.results mapping 
        fetch("https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added")
            .then(response => response.json())
            .then(data => data.results.map( d => {
                embed.addField("\u200B", `${d.name}`)
                y++;
                y==10?message.channel.send(embed):0; //if 10 send embed otherwise don't 

            }));
            delete embed;

        return;
    },
};