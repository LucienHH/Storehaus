const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'stores',
    description: 'Get links to the stores that sell the game.',
    cooldown: 5,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        //GET
        //Test query below
        let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle(`Links to the stores that sell the game.`)

        var y = 0; // used as counter for data.results mapping 
        fetch(`https://api.rawg.io/api/games?search=${game}&page_size=1`)
            .then(result => result.json())
            .then(data => {
                console.log(data.results.map(d => {
                    console.log(d.slug)

                    fetch(`https://api.rawg.io/api/games/${d.slug}/stores`)
                        .then(response => response.json())
                        .then(data => {
                            data.results.map(d => {
                                embed.addField("\u200B", `${d.url}`)
                            })
                            embed.setFooter(`Try running !gameinfo name of a game to learn more about a game!`)
                            message.channel.send(embed)
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