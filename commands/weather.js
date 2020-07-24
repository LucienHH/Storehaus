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

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&appid=${process.env.open_weather}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.query.map(d => {
            //     console.log(d)
                //modify title string so URL works
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Weather for ${args[0]}`)
                .addField("Temp:",data.main.temp)
                .addField("Feels like:",data.main.feels_like)
                .addField("Min temp:",data.main.temp_min)
                .addField("Max temp:",data.main.temp_max)
                .addField("Humidity:",data.main.humidity)
                .addField("Sunrise:",data.sys.sunrise)
                .addField("Sunset",data.sys.sunset)
                message.channel.send(embed);
            // }))

            // console.log(data);
        }
        );
        delete embed;

        return; 
        }
}