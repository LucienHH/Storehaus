require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'nasa',
    description: 'Retrieve the NASA picture of the day! To run, try `!nasa`',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(0).join(" ");

        fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
        .then(response => response.json())
        .then(data => {             
                var image = data.url
                var info = data.explanation
                var dateTaken = data.date
                var author = data.copyright

                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`NASA Pic of the Day`)
                .setImage(image)
                .addField(`Description`, `${info}. Taken on ${dateTaken}, copyright ${author}`)
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}