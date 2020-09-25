const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'anime',
    description: 'Retrieve a quote from an anime. To run, try `!anime random` or `!anime [name of anime series]`',
    cooldown: 5,
    testEnvironment: 'node',
    async execute(message, args) {
        
        let option = args.slice(" ").join("%20")
        console.log(`anime option: ${option}`)
        if (option == undefined || option=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("Try `!anime random` or `!anime [name]`")).then(m => m.delete({timeout: 10000}));
            return;
        }

        if (option =="random") {
            fetch(`https://animechanapi.xyz/api/quotes/random`)
            .then(response => response.json())
            .then(data => {
                    var quote1 = data.data[0].quote;
                    var character1 = data.data[0].character;
                    var anime1 = data.data[0].anime; 
    
                    let embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .setTitle(`Anime Quotes`)
                    .addField(anime1,`${quote1} - ${character1}`)
                    message.channel.send(embed);
            }
            );

    
            return;
        }
        else 
        {
            fetch(`https://animechanapi.xyz/api/quotes?anime=${option}`)
            .then(response => response.json())  
            .then(data => {
                if(data.data.length == 0){
                    return message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`Random quote from: ${args.slice(" ").join(" ")}`)
                    .setColor("#ff00ff")
                    .addField("\u200B","There seems to be no quotes available for this anime. Contact the developers and they'll do their best to make that change"))
                }
                    var quote1 = data.data[0].quote;
                    var character1 = data.data[0].character;
                    var anime1 = data.data[0].anime; 
                    //This if statement currently does not execute. Will need to rewrite this. 
                    if (quote1 == "null"|| quote1 == null || quote1 == undefined)
                    {
                        message.channel.send("K it failed")
                    }
                    else{
                        let embed = new Discord.MessageEmbed()
                        .setColor("#ff00ff")
                        .setTitle(`Anime Quotes`)
                        .addField(anime1,`${quote1} - ${character1}`)
                        message.channel.send(embed);
                    }
                    
            }
            );

            return;
        }
        function anime(quote, character, anime) {
            // return a + b;
            const fetch = require('node-fetch');
            fetch(`https://animechanapi.xyz/api/quotes/random`)
                    .then(response => response.json())
                    .then(data => {
                            var quote1 = data.data[0].quote;
                            var character1 = data.data[0].character;
                            var anime1 = data.data[0].anime; 
                            quote = quote1;
                            character = character1;
                            anime = anime;
                    })
          }
    }
        
}