require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');
module.exports = {
    name: 'exchangerates',
    aliases: [`exchange`, `currency`],
    description: 'See how much your currency is worth around the world! To run, type `!currency USD`\n Supported currencies: GBP, HKD, IDR, ILS, DKK, INR, CHF, MXN, CZK, SGD, THB, HRK, EUR, MYR, NOK, CNY, BGN, PHP, PLN, ZAR, CAD, ISK, BRL, RON, NZD, TRY, JPY, RUB, KRW, USD, AUD, HUK, SEK',
    cooldown: 5,
    async execute(message, args) {
        let input = args.slice(0).join(" ");
        const currency = input.toUpperCase(); 
        console.log(`Currency: ${currency}`)
        if (currency == undefined || currency=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a currency. Use `!help currency` to see all supported currencies.")).then(m => m.delete({timeout: 10000}));
            return;
        }

        var y = 0; // used as counter for mapping 
        fetch(`https://api.ratesapi.io/api/latest?base=${currency}`)
        .then(response => response.json())
        .then(data => {             
                var rates = data.rates
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                //.addField(`Exchange Rates for ${currency}`, rates)
                .setTitle('Exchange Rates')
                .setFooter(helpers.getFooter());
                embed.addField("\u200B", `${rates}`)
                y++;
                y==10?message.channel.send(embed):0; //if 10 send embed otherwise don't 
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}