require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();
var moment = require('moment'); // require

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');
module.exports = {
    name: 'nasa',
    description: 'Retrieve the NASA picture of the day! To run, try `!nasa`',
    cooldown: 60,
    async execute(message, args) {
        let option = args.slice(0).join(" ");
        // This package gets today's date. Sometimes the NASA API tries to grab tomorrow's data without this.
        var now = moment().format().slice(0,-15);
        console.log(now)
        fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${now}`)
        .then(response => response.json())
        .then(data => {             

            if (data.code == 404) {
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`No Pic of The Day today :(. Try using \`!mars\` instead!)`));

                return;
            }
            else {
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
        }
        );
        delete embed;

        return;
    }
}