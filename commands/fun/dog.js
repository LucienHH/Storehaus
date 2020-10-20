const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    category: 'fun',
    aliases: [],
    description: 'Retrieve a picture a good doggo. To run, try `!dog`',
    cooldown: 5,
    usage: ' ',
    async execute(message, args) {
        fetch(`https://api.thedogapi.com/v1/images/search`)
        .then(response => response.json())
        .then(data => {             
                var image = data[0].url
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Cute Doggo`)
                .setImage(image)
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}