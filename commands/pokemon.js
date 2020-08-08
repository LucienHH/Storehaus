require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');
module.exports = {
    name: 'pokemon',
    description: 'Retrieve the NASA picture of the day! To run, try `!nasa`',
    cooldown: 5,
    async execute(message, args) {
        let pokemon = args.slice(0).join(" ");

        function pokemonVersion(){
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {  
            //message_.reactions.removeAll();
            //message_.edit(new Discord.MessageEmbed().setTitle("test"));
            embed = new Discord.MessageEmbed()
            let i=0;
            data.game_indices.map(d => {
                embed.addField(`\u200b` ,`**${++i}** - *${d.version.name}*`, true);
                embed.setFooter(`❌ Return to the main menu.`)
            })
            message.channel.send(embed).then(function (messageGame){
                messageGame.react('❌');
                })
            })
            if (reaction.emoji.name === '❌')
            {   
                message2.reactions.removeAll();
                message2.delete();
                //embed.delete;
                mainMenu();
            }
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
            embed.addField(`Type:`,`${d.type.name}`)
            embed.setFooter(`❌ Return to the main menu.`)
            })
            message.channel.send(embed).then(function (messageGame){
                messageGame.react('❌');
                })
            })
            if (reaction.emoji.name === '❌')
            {   
                message2.reactions.removeAll();
                message2.delete();
                //embed.delete;
                mainMenu();
            }
            //End Type function
        }


        function mainMenu() {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {         
                let title = new Discord.MessageEmbed() 
                title.setColor("#ff00ff")
                title.addField(`Pokemon Info for ${pokemon}`,`👍 Get a list of all the versions that ${pokemon} has appeared in. \n 👀 See what type ${pokemon} is \n 🌎 See where to find this Pokemon \n❌ Return to the main menu.`)
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
                    message_.react('👍').then(() => message_.react('❌').then(() => message_.react('👀').then(() => message_.react('🌎'))));
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