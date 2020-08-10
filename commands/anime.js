const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'anime',
    description: 'Retrieve a quote from an anime. To run, try `!anime random` or `!anime [name of anime series]`',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(" ").join("%20")
        console.log(option)
        if (option == undefined || option=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("Try `!anime random` or `!anime [name]`")).then(m => m.delete({timeout: 10000}));
            return;
        }

        if (option =="random") {
            fetch(`https://anime-chan.herokuapp.com/api/quotes`)
            .then(response => response.json())
            .then(data => {
                    var quote1 = data[0].quote;
                    var character1 = data[0].character;
                    var anime1 = data[0].anime;

                    var quote2 = data[1].quote;
                    var character2 = data[1].character;
                    var anime2 = data[1].anime;
                    
                    var quote3 = data[2].quote;
                    var character3 = data[2].character;
                    var anime3 = data[2].anime;  
    
                    let embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .setTitle(`Anime Quotes`)
                    .addField(anime1,`${quote1} - ${character1}`)
                    .addField(anime2,`${quote2} - ${character2}`)
                    .addField(anime3,`${quote3} - ${character3}`)
                    message.channel.send(embed);
            }
            );
            delete embed;
    
            return;
        }
        else 
        {
            fetch(`https://anime-chan.herokuapp.com/api/quotes?anime=${option}`)
            .then(response => response.json())  
            .then(data => {
                    var quote1 = data[0].quote;
                    var character1 = data[0].character;
                    var anime1 = data[0].anime; 
                    //This if statement currently does not execute. Will need to rewrite this. 
                    if (quote1 == "null"|| null || undefined)
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
            
            delete embed;
    
            return;
        }
    }
        
}