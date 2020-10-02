const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'steamdeals',
    aliases: [`steam`],
    description: 'Get deals about a game on Steam. To run, type `!steamdeals name of game`',
    cooldown: 5,
    usage: ` fallout 3`,
    async execute(message, args) {
        let game = args.slice(0).join(" ");
        const querystring = require('querystring')

        //If no game is provided
        if (!args.length) {
            return message.channel.send('You need to supply a search term! Try `!steamdeals name of a game`.');
        }

        const query = querystring.stringify({ term: args.join(' ') });

        //GET Game deals by title name
        let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle(`Steam deals matching ${game}`)
        let onSaleNo = 0;
        let y = 0;
        fetch(`https://www.cheapshark.com/api/1.0/deals?title=${args.join(' ')}&storeID=1&pageSize=5`)
            .then(response => response.json())
            .then(data => data.map(d => {
                console.log(d);
                y++
                //Store for converting sale date from epoch time
                var saleStart = new Date(d.lastChange * 1000);
                if (d.isOnSale != 0) {
                    embed.addField(`${d.title}`, `$${d.salePrice} down from $${d.normalPrice}`)
                    onSaleNo++;
                }
            })).then(e => {
                if (onSaleNo == 0) {
                    message.channel.send(new Discord.MessageEmbed().setTitle("No sales found")).then(m => m.delete({ timeout: 10000 }))
                } else {
                    message.channel.send(embed)
                }
            });
        return;
    }
};
