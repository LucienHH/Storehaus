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
        fetch("https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added")
            .then(response => response.json())
            .then(data => data.results.map( d => {
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField('GOTY:' , `${d.name}`)
                // .addField('Answer:', `${d.correct_answer}`)
                message.channel.send(embed);

                delete embed;

            }));
        return;
    },
};