const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'Retrieve a picture a good doggo. To run, try `!dog`',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(0).join(" ");

        fetch(`https://api.thecatapi.com/v1/images/search`)
        .then(response => response.json())
        .then(data => {             
                var image = data[0].url
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Cute Kitty`)
                .setImage(image)
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}