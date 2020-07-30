require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');
module.exports = {
    name: 'today',
    description: 'See what happened today in history! To run, try `!today`',
    cooldown: 60,
    async execute(message, args) {
        let option = args.slice(0).join(" ");

        fetch(`http://history.muffinlabs.com/date`)
        .then(response => response.json())
        .then(data => {             
                //This API is a bit strange to use, which is why these variables have odd values.
                var date = data.date
                var title = data.data.Events[0].text
                var year = data.data.Events[0].year
                var url = data.data.Events[0].links[0].link

                var title2 = data.data.Events[1].text
                var year2 = data.data.Events[1].year
                var url2 = data.data.Events[1].links[0].link

                var title3 = data.data.Events[2].text
                var year3 = data.data.Events[2].year
                var url3 = data.data.Events[2].links[0].link

                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`${date} In History`)
                .addField(`${year}`, `${title}\n Read more: ${url}`)
                .addField(`${year2}`, `${title2}\n Read more: ${url2}`)
                .addField(`${year3}`, `${title3}\n Read more: ${url3}`)
                .setFooter(helpers.getFooter());
                message.channel.send(embed);
        }
        );
        delete embed;

        return;
    }
}