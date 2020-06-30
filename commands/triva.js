const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'trivia',
    description: 'Learn something new about gaming, TV, film, and history. Do trivia `(game, TV, film, or history)` to learn more.',
    cooldown: 5,
    async execute(message, args) {
        let userInput = args.slice(0).join(" ");

        if(userInput == "game"){
        //GET game query
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
        }
        else if(userInput == "TV" || userInput == "television" || userInput == "tv"){
        //GET TV query
        fetch("https://opentdb.com/api.php?amount=1&category=14")
            .then(response => response.json())
            .then(data => data.results.map( d => {
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField('Trivia:' , `${d.question}`)
                .addField('Answer:', `${d.correct_answer}`)
                message.channel.send(embed);

                delete embed;

            }));
        }

        else if(userInput == "film" || userInput == "movie"){
            //GET film query
            fetch("https://opentdb.com/api.php?amount=1&category=11")
                .then(response => response.json())
                .then(data => data.results.map( d => {
                    const embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .addField('Trivia:' , `${d.question}`)
                    .addField('Answer:', `${d.correct_answer}`)
                    message.channel.send(embed);
    
                    delete embed;
    
            }));
        }

        else if(userInput == "history"){
            //GET history query
            fetch("https://opentdb.com/api.php?amount=1&category=23")
                .then(response => response.json())
                .then(data => data.results.map( d => {
                    const embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .addField('Trivia:' , `${d.question}`)
                    .addField('Answer:', `${d.correct_answer}`)
                    message.channel.send(embed);
        
                    delete embed;
        
            }));
        }

    },
};