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
        if (currency == undefined || currency == "") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a currency. Use `!help currency` to see all supported currencies.")).then(m => m.delete({ timeout: 10000 }));
            return;
        }

        var y = 0; // used as counter for mapping 
        fetch(`https://api.ratesapi.io/api/latest?base=${currency}`)
        .then(response => (response.json()))
        .then(data => {   

            //couldn't automate grabbing the currencies 
                var rates = data.rates.currency
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Exchange Rates for ${currency}`)
                // .addField(`Exchange Rates for ${currency}`)
                // .setFooter(helpers.getFooter());
                .addField("GBP", `${data.rates.GBP}`,true)
                .addField("HKD", `${data.rates.HKD}`,true)
                .addField("IDR", `${data.rates.IDR}`,true)
                .addField("ILS", `${data.rates.ILS}`,true)
                .addField("DKK", `${data.rates.DKK}`,true)
                .addField("EUR", `${data.rates.EUR}`,true)
                .addField("MXN", `${data.rates.MXN}`,true)
                .addField("CZK", `${data.rates.CZK}`,true)
                .addField("SGD", `${data.rates.SGD}`,true)//10
                // .addField("THB", `${data.rates.THB}`,true)
                // .addField("HRK", `${data.rates.HRK}`,true)
                // .addField("CAD", `${data.rates.CAD}`,true)                
                // .addField("MYR", `${data.rates.MYR}`,true)
                // .addField("NOK", `${data.rates.NOK}`,true)
                // .addField("CNY", `${data.rates.CNY}`,true)
                // .addField("BGN", `${data.rates.BGN}`,true)
                // .addField("PHP", `${data.rates.PHP}`,true)
                // .addField("PLN", `${data.rates.PLN}`,true)
                // .addField("ZAR", `${data.rates.ZAR}`,true)
                // .addField("ISK", `${data.rates.ISK}`,true)
                // .addField("BRL", `${data.rates.BRL}`,true)
                // .addField("RON", `${data.rates.RON}`,true)
                // .addField("NZD", `${data.rates.NZD}`,true)
                // .addField("INR", `${data.rates.INR}`,true)
                // .addField("CHF", `${data.rates.CHF}`,true)
                message.channel.send(embed);
                delete embed;
///
///MAKE THE BELOW EMBED AS AN OPTION TO NAVIGATE TO
///
                // let embed = new Discord.MessageEmbed()
                // .setColor("#ff00ff")
                // //.addField(`Exchange Rates for ${currency}`, rates)
                // .setTitle('Exchange Rates Part 2')
                // .addField("NZD", `${data.rates.currency}`)
                // .addField("TRY", `${data.rates.currency}`)
                // .addField("JPY", `${data.rates.currency}`)
                // .addField("RUB", `${data.rates.currency}`)
                // .addField("KRW", `${data.rates.currency}`)
                // .addField("USD", `${data.rates.currency}`)
                // .addField("AUD", `${data.rates.currency}`)
                // .addField("SEK", `${data.rates.currency}`)
                
        }
        );

        return;
    }
}