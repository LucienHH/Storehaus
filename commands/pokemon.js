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

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {         

            let title = new Discord.MessageEmbed() 
            title.setColor("#ff00ff")
            title.addField(`Get Info`,`✅ Get a list of all the versions this pokemon has appeared in. \n ❌ Get a list of abilities of this Pokemon.`)
            //let i=0;
            // data.game_indices.map(d => {
            //     title.addField(`\u200b` ,`**${++i}** - *${d.version.name}*`, true);
            // })
            // data.types.map(d => {
            // title.addField(`Type:`,`${d.type.name}`)
            // })
            title.setFooter(helpers.getFooter());

            message.channel.send(title).then(function (message_) {
                message_.react('✅').then(() => message_.react('❌'));
                if (reaction.emoji.name === '✅') {
                    title.edit(new Discord.MessagEmbed().setTitle("Kevin"))
                }
            })
            message_.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
 
            })

        }
        );
        delete embed;

        return;
    }
}