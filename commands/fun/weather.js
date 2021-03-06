require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../../helpers/helpers');

module.exports = {
    name: 'weather',
    category: 'fun',
    aliases: [],
    description: 'Retrieve the weather! To run, try !weather city',
    cooldown: 5,
    usage: ` anchorage`,
    async execute(message, args) {
        let option = args.slice(0).join(" ");
        if (option == undefined || option=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a location to see the weather")).then(m => m.delete({timeout: 10000}));
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${option}&appid=${process.env.open_weather}`)
        .then(response => response.json())
        .then(data => {           
            data.message&&data.message=="city not found"?message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setTitle("City not found. Maybe try an alternative spelling?")):null; 
                var temp = data.main.temp
                var fahrenheit = temp * 1.8 -459.67
                var celsius = temp -  273.15

                var feelsLikeF = data.main.feels_like * 1.8 -459.67
                var feelsLikeC = data.main.feels_like - 273.15

                var MinTempF = data.main.temp_min * 1.8 -459.67
                var MinTempC = data.main.temp_min - 273.15

                var MaxTempF = data.main.temp_max * 1.8 -459.67
                var MaxTempC= data.main.temp_max - 273.15

                var sunrise = new Date(data.sys.sunrise * 1000);
                var sunset = new Date(data.sys.sunset * 1000);

                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Weather for ${data.name}, ${data.sys.country}`)
                .addField(`Current Conditons`, `${data.weather[0].description}`)
                .addField("Current Temperature", `${fahrenheit.toFixed(2)}f (${celsius.toFixed(2)}c)`)
                .addField("Feels like:", `${feelsLikeF.toFixed(2)}f (${feelsLikeC.toFixed(2)}c)`)
                .addField("Min temp:", `${MinTempF.toFixed(2)}f (${MinTempC.toFixed(2)}c)`)
                .addField("Max temp:", `${MaxTempF.toFixed(2)}f (${MaxTempC.toFixed(2)}c)`)
                .addField("Humidity:", `${data.main.humidity}%`)
                .addField("Sunrise:",`${sunrise.toGMTString().slice(0,-7)}GMT`)
                .addField("Sunset",`${sunset.toGMTString().slice(0,-7)}GMT`)
                .setFooter(helpers.getFooter());
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}