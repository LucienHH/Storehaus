require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'weather',
    description: 'Retrieve the weather! To run, try !weather city',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(0).join(" ");

        fetch(`api.openweathermap.org/data/2.5/weather?q=${args[0]}&appid=${process.env.open_weather}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.query.map(d => {
                console.log(d)
                //modify title string so URL works
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField(`Weather for ${args[0]}` ,d)
                message.channel.send(embed);
            }))
        }
        );
        delete embed;

        return; 
        }
}