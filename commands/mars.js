require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'mars',
    description: 'Retrieve a picture from the Mars Curiosity rover! To run, try `!mars`',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(0).join(" ");
        //Used to select image at random
        var random = Math.floor(Math.random() * 1000) + 1  
        console.log(random)

        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${random}&api_key=DEMO_KEY`)
        .then(response => response.json())
        .then(data => {             
                var image = data.photos[0].img_src
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`NASA Pic from Curiosity Rover`)
                .setImage(image)
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}