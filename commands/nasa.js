require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');
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
                var length = 800;
                var trimmedString = info.substring(0, length);
                var title = data.title
                var dateTaken = data.date
                var author = data.copyright
                console.log(image);

                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`NASA Pic of the Day`)
                .setDescription(`${data.title}`)
                .addField(`Description`, `${trimmedString}...\n Author: ${author}. Date Taken: ${dateTaken}`)
                .setImage(image)
                .setFooter(helpers.getFooter());
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}