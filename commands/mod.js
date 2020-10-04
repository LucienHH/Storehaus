const Discord = require('discord.js');
const client = new Discord.Client();
let helpers = require("../helpers/helpers")

//Fetch required for API Call
const fetch = require('node-fetch');
// const { require } = require('find-config');

module.exports = {
    name: '_mods',
    aliases: [],
    description: 'Get the top trending mods about a game on Nexus Mods. Try `!mods name of game`',
    cooldown: 10,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        const querystring = require('querystring')

        //If no game is provided
        // // // if (!args.length) {
        // // //     return message.channel.send('You need to supply a search term! Try `!mod name of a game`.');
        // // //   }

        // // // const query = querystring.stringify({ term: args.join(' ') });
        // // // var headers = {
        // // //     "apikey": process.env.nexus_api
        // // // }


        // // // fetch(`https://api.nexusmods.com/v1/games.json?`,{headers: headers})
        // // // .then(response => response.json())
        // // // .then(data => {
        // // //     if (data.name.toLowerCase() == 'the witcher 3') {
        // // //         console.log(owo);
        // // //     };
        // // // })
        //GET Game trending mods by title name
    //     let y =0
    //     let embed = new Discord.MessageEmbed()
    //    .setColor("#ff00ff")
    //    .setTitle(`Trending Mods`);
    //     fetch(`https://api.nexusmods.com/v1/games/${args.join(' ')}/mods/trending.json?`,{headers: headers})
    //         .then(response => response.json())
    //         .then(data => data.map(d => {
    //             embed.addField("\u200B", `${d.name}`)
    //             y++;
    //             y==10?message.channel.send(embed):0; //if 10 send embed otherwise don't 
    //             embed.setFooter(helpers.getFooter());
    //         }));

    //         delete embed;
            // embed.setFooter("Find more great mods at https://www.nexusmods.com")
            // message.channel.send(embed);
        return;
    }
};
