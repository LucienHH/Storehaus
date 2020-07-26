const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'goty',
    description: 'Learn the best games from a particular year! To run, type `!goty year`',
    cooldown: 5,
    async execute(message, args) {
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/tips.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);

        let game = args.slice(0).join(" ");
        if (game == undefined || game=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a year to see the GOTY contenders")).then(m => m.delete({timeout: 10000}));
            return;
        }
        //GET
        //Test query below
        let embed = new Discord.MessageEmbed()
        .setColor("#ff00ff")
        .setTitle(`Game of the Year Contenders for ${args[0]}`)

        var y = 0; // used as counter for data.results mapping 
        fetch(`https://api.rawg.io/api/games?dates=${args[0]}-01-01,${args[0]}-12-31&ordering=-added`)
            .then(response => response.json())
            .then(data => data.results.map( d => {
                embed.addField("\u200B", `${d.name}`)
                y++;
                y==10?message.channel.send(embed):0; //if 10 send embed otherwise don't 
                embed.setFooter(helpers.getFooter());
            }));
            delete embed;

        return;
    },
};