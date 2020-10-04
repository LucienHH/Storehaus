
const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
const fetch = require('node-fetch');
// const { require } = require('find-config');
let helpers = require("../helpers/helpers")

module.exports = {
    name: 'league',
    aliases: [],
    description: 'Set global prefix for the guild.',
    cooldown: 5,
    async execute(message, args) {
        //
        //vars
        //
        let ddragonVersion = "10.15.1";
        let summoner = args.slice(0).join(" ");
        var headers = {
            "X-Riot-Token": process.env.riot_api

        }

       
        fetch(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`, { headers: headers })
        // .then(result => result.json())
            // .then(data => {
            //     fetch(`https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/BKE_ooL5eRDnwGKXuCnBt45_aUG0EgjJDWu43YdnBk0by50`, {headers: headers})
            //     .then(result => result.json())
            //     .then(data => console.log(data))
            // })
            .then(result => result.json())
            .then(data => {
                console.log(data);
                try{
                    if (data.status.status_code ==404) {
                        let embed = new Discord.MessageEmbed()
                        .setTitle("Could not find the specified summoner, please try again.");
                        message.channel.send(embed).then(message => message.delete({timeout: 10000}))
                        return
                    }
                }catch{

                }
                let embed = new Discord.MessageEmbed()
                    .setTitle(data.name)
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/10.15.1/img/profileicon/${data.profileIconId}.png`)
                    .addField("Summoner level:", data.summonerLevel);
                message.channel.send(embed);
            })

    }
}