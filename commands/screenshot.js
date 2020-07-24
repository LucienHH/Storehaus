const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'screenshot',
    description: 'Get screenshots for a game. To run, type `!screenshot name of a game`',
    cooldown: 5,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        //GET
        //Test query below
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
        fetch(`https://api.rawg.io/api/games/{game_pk}/additions`)
            .then(response => response.json())
            .then(data => data.results.map(d => {
                embed.addField("\u200B", `${d.name}`)
                y++;
                y == 10 ? message.channel.send(embed) : 0; //if 10 send embed otherwise don't 
                embed.setFooter(`Try running !gameinfo name of a game to learn more about a game!`)
            }));
        delete embed;

        return;
    },
};