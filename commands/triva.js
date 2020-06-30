const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'trivia',
    description: 'Learn something new about gaming!',
    cooldown: 5,
    async execute(message, args) {
        //GET
        fetch("https://opentdb.com/api.php?amount=1&category=15")
            .then(response => response.json())
            .then(data => data.results.map( d => {
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField('Trivia:' , `${d.question}`)
                .addField('Answer:', `${d.correct_answer}`)
                message.channel.send(embed);

                delete embed;

            }));
        return;
    },
};