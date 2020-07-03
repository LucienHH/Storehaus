const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require('../helpers/helpers');
const fetch = require('node-fetch');

module.exports = {
    name: 'trivia',
    description: 'Learn something new about gaming, TV, film, and history. Try trivia `(game, TV, film, or history)` to learn more.',
    cooldown: 5,
    async execute(message, args) {

        let userInput = args.slice(0).join(" ");

        if(userInput == "game"){
        //GET game query
        fetch("https://opentdb.com/api.php?amount=1&category=15")
            .then(response => response.json())
            .then(data => data.results.map( d => {
                question = helpers.replaceAllSpecialChars(d.question)
                correct_answer = helpers.replaceAllSpecialChars(d.correct_answer)
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField('Trivia:' , `${question}`)
                .addField('Answer:', `${correct_answer}`)
                message.channel.send(embed);

                delete embed;

            }));
        return;
        }
        else if(userInput.toLowerCase() == "tv" || userInput.toLowerCase() == "television"){
        //GET TV query
        fetch("https://opentdb.com/api.php?amount=1&category=14")
            .then(response => response.json())
            .then(data => data.results.map( d => {
                question = helpers.replaceAllSpecialChars(d.question)
                correct_answer = helpers.replaceAllSpecialChars(d.correct_answer)
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField('Trivia:' , `${question}`)
                .addField('Answer:', `${correct_answer}`)
                message.channel.send(embed);

                delete embed;

            }));
        }

        else if(userInput.toLowerCase() == "film" || userInput.toLowerCase() == "movie"){
            //GET film query
            fetch("https://opentdb.com/api.php?amount=1&category=11")
                .then(response => response.json())
                .then(data => data.results.map( d => {
                    question = helpers.replaceAllSpecialChars(d.question)
                    correct_answer = helpers.replaceAllSpecialChars(d.correct_answer)
                    const embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .addField('Trivia:' , `${question}`)
                    .addField('Answer:', `${correct_answer}`)
                    message.channel.send(embed);
    
                    delete embed;
    
            }));
        }

        else if(userInput.toLowerCase() == "history"){
            //GET history query
            fetch("https://opentdb.com/api.php?amount=1&category=23")
                .then(response => response.json())
                .then(data => data.results.map( d => {
                    question = helpers.replaceAllSpecialChars(d.question)
                    correct_answer = helpers.replaceAllSpecialChars(d.correct_answer)
                    const embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .addField('Trivia:' , `${question}`)
                    .addField('Answer:', `${correct_answer}`)
                    message.channel.send(embed);
        
                    delete embed;
        
            }));
        }

    },
};