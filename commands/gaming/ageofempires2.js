//WIP

require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../../helpers/helpers');
module.exports = {
    name: 'age2',
    category: 'gaming',
    aliases: [`age`, `age of empires`, `age 2`],
    description: 'Retrieve info about everything Age of Empires 2! To run, try `!age2`. To see all commands in Age 2, try `!age2 all`',
    cooldown: 5,
    usage: " list: `!age2 civs` or `!age2 japanese` or `!age2 all`",
    async execute(message, args) {
        let input = args.slice(0).join(" ");
        const option = input.toLowerCase(); 

        if (option == undefined || option=="" || option == "all") {
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle(`Age of Empires 2 Commands`)
            .addField(`Civs`, "See all the information about every civ in Age of Empires 2. Can also be used for an individual civ\n`!age2 all civs` or `!age2 japenese`")
            //.addField(`Units`, "See all the information about every unit in Age of Empires 2. Can also be used for an individual unit. \n`!age2 all units` or `!age2 villager`")
            .setFooter(`<3`)
            message.channel.send(embed);
            delete embed;
            return;
        }
        if (option == "all civs" || option == "civs")
        {        
        fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations`)
        .then(response => response.json())
        .then(data => {             
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`All Civilization Info`);

                data.civilizations.map(d =>{
                    embed.addField(`${d.name}`, `Expansion Pack: ${d.expansion}`,true)
                })
                message.channel.send(embed);
            }
            );
        delete embed;

        return;
        }
        //End if
        if (option == "aztecs" || option == "britons" || option == "byzantines"  ||option == "celts" ||option == "chinese" ||option == "goths" ||option == "huns" ||option == "japanese" ||option == "koreans" ||option == "mayans" ||option == "mongols" ||option == "persians" ||option == "saracens" ||option == "spanish" ||option == "teutons" ||option == "turks" ||option == "vikings")
        {
            fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${option}`)
            .then(response => response.json())
            .then(data => {             
                    let embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .setTitle(`Civilization Info`);
                    embed.addField(`${data.name}`, `Expansion Pack: ${data.expansion}\n Army Type: ${data.army_type}\n Team Bonus: ${data.team_bonus}`)
                    message.channel.send(embed);
                }
                );
            delete embed;
    
            return;
        }
        // if (option == "all units" || option == "units")
        // {        
        // fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/units`)
        // .then(response => response.json())
        // .then(data => {             
        //         let embed = new Discord.MessageEmbed()
        //         .setColor("#ff00ff")
        //         .setTitle(`Units Info`);

        //         data.units.map(d =>{
        //             embed.addField(`${d.name}`, `Description: ${d.description}\n Expansion: ${d.expansion}\n Age: ${d.age}`,true)
        //         })
        //         message.channel.send(embed);
        //     }
        //     );
        // delete embed;

        // return;
        // }
        else{
            message.channel.send(">>> Sorry, that was not found. Please try running the `!age2` command again");
        }

    }
}