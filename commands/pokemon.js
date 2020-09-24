//WIP

require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

//API Wrapper
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
module.exports = {
    name: 'pokemon',
    description: 'Retrieve the NASA picture of the day! To run, try `!nasa`',
    cooldown: 5,
    async execute(message, args) {
        let pokemon = args.slice(0).join(" ");
        //----------Beginning of code for API wrapper-----------
        // P.getPokemonByName('eevee') // with Promise
        // .then(function(response) {
        //   console.log(response);
        // })
        // .catch(function(error) {
        //   console.log('There was an ERROR: ', error);
        // });

        // P.getRegionByName("sinnoh")
        // .then(function(response) {
        //   console.log(response);
        // })
        //----------End of Commented out code for API wrapper---------

        function pokemonVersion(){
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {  
            //message_.reactions.removeAll();
            //message_.edit(new Discord.MessageEmbed().setTitle("test"));
            embed = new Discord.MessageEmbed()
            let i=0;
            data.game_indices.map(d => {
                embed.setTitle(`${pokemon} appears in:`)
                embed.addField(`\u200b` ,`**${++i}** - *${d.version.name}*`, true);
                embed.setFooter(`❌ Return to the main menu.`)
            })



            message.channel.send(embed).then(function (messageGame){
                // messageGame.react('❌');
                messageGame.react('❌');
    
                const filter = (reaction, user) => {
                    return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
    
                messageGame.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
    
                        if (reaction.emoji.name === '❌') {
                            messageGame.delete();
                        mainMenu();
                        }
                    })
                })
            })
        }
        //End of version function
        function pokemonType()
        {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {  
            //message_.reactions.removeAll();
            //message_.edit(new Discord.MessageEmbed().setTitle("test"));
            embed = new Discord.MessageEmbed()
            data.types.map(d => {
            embed.addField(`Types for ${pokemon}:`,`${d.type.name}`)
            embed.setFooter(`❌ Return to the main menu.`)
            })
            message.channel.send(embed).then(function (messageGame){
                // messageGame.react('❌');
                messageGame.react('❌');
    
                const filter = (reaction, user) => {
                    return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
    
                messageGame.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
    
                        if (reaction.emoji.name === '❌') {
                            messageGame.delete();
                        mainMenu();
                        }
                    })
                })})
        }
        //End Type function

        function pokemonAbilities(){
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {  
            //message_.reactions.removeAll();
            //message_.edit(new Discord.MessageEmbed().setTitle("test"));
            embed = new Discord.MessageEmbed()
            let i=0;
            data.abilities.map(d => {
                embed.setTitle(`${pokemon} abilities:`)
                embed.addField(`\u200b` ,`**${++i}** - *${d.ability.name}*`, true);
                embed.setFooter(`❌ Return to the main menu.`)
            })
            message.channel.send(embed).then(function (messageGame){
                // messageGame.react('❌');
                messageGame.react('❌');
    
                const filter = (reaction, user) => {
                    return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
    
                messageGame.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
    
                        if (reaction.emoji.name === '❌') {
                            messageGame.delete();
                        mainMenu();
                        }
                    })
                })})
        }
        //End of version function

        function mainMenu() {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {         
                let title = new Discord.MessageEmbed() 
                title.setColor("#ff00ff")
                title.addField(`Pokemon Info for ${pokemon}`,`👍 Get a list of all the versions that ${pokemon} has appeared in. \n 👀 See what type ${pokemon} is \n 🌎 See the abilities of this Pokemon \n❌ Return to the main menu.`)
                // let i=0;
                // data.game_indices.map(d => {
                //     title.addField(`\u200b` ,`**${++i}** - *${d.version.name}*`, true);
                // })
                // data.types.map(d => {
                // title.addField(`Type:`,`${d.type.name}`)
                // })
                title.setFooter(helpers.getFooter());
                const filter = (reaction, user) => {
                    return ['👍', '👀', ,'🌎', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                message.channel.send(title).then(function (message_) {
                    message_.react('👍')
                    message_.react('👀')
                    message_.react('🌎');
                    message_.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                    if (reaction.emoji.name === '👍')
                    {   
                        message_.reactions.removeAll();
                        message_.delete();
                        //embed.delete;
                        pokemonVersion();
                    }
                    if (reaction.emoji.name === '👀')
                    {   
                        message_.reactions.removeAll();
                        message_.delete();
                        //embed.delete;
                        pokemonType();
                    }
                    if (reaction.emoji.name === '🌎')
                    {   
                        message_.reactions.removeAll();
                        message_.delete();
                        //embed.delete;
                        pokemonAbilities();
                    }
    
                    })
                })
    
            }
            );
            delete embed;
    
            return;
        }
        //End of Main Menu Function

        if (pokemon == undefined || pokemon=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("Try `!pokemon `name of pokemon`")).then(m => m.delete({timeout: 10000}));
            return;
        }
        else {
            mainMenu();
        }
    }
}