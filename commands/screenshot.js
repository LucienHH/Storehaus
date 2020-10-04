const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    name: 'screenshot',
    aliases: [],
    description: 'Get screenshots for a game. To run, type `!screenshot name of a game`',
    cooldown: 10,
    usage: ` Outer Worlds`,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        if (game == undefined || game=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a game to see a screenshot")).then(m => m.delete({timeout: 10000}));
            return;
        }
        var lowerCaseGame = game.toLowerCase();
        var fs = require('fs');
        //Check this text file, if bad input matches, command is not allowed
        var array = fs.readFileSync('textfiles/BadInput.txt').toString().split("\n");
            //Remove the \r and \n of each element in the array
            for (var i = 0 ; i != array.length ; i++) {
                array[i] = array[i].trim();
            }
    
            //Sends array to lower case
            sorted=array.join('|').toLowerCase().split('|');

            //Bad Input, Give Error
            if (sorted.indexOf(lowerCaseGame) > -1) {
                //In the array
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setDescription(`This is not allowed, please try again with the name of a game.`)

                message.channel.send(embed);
                delete embed;
    
            //Good Input, Continue
            } else {
                //Not in the array
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
    
                message.channel.send("Fetching. This may take a while...").then(message => message.delete({timeout: 10000}))
            var y = 0; // used as counter for data.results mapping 
            fetch(`https://api.rawg.io/api/games?search=${game}&page_size=1`)
                .then(result => result.json())
                .then(data => {
                    console.log(data.results.map(d => {
                        console.log(d.slug)
    
                        fetch(`https://api.rawg.io/api/games/${d.slug}/screenshots`)
                            .then(response => response.json())
                            .then(data => {
                                let array = new Array();
                                data.results.map(d => {
                                    array.push(d.image)
                                })
                                var randomElement = array[Math.floor(Math.random() * array.length)];
                                embed.setImage(randomElement);
                                // console.log(array);
                                message.channel.send(embed); 
                            }
                            );
                        delete embed;
                    }));
                })
    
            return;
    
            }
 
    },
};