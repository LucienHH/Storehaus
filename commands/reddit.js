const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'xbl',
    description: 'Get deals about a game on steam. Try !gogdeals `name of game`!',
    cooldown: 5,
    async execute(message, args) {
        //GET Game deals by title name
        fetch(`https://www.reddit.com/r/nocontextxboxmessages.json?show=all&limit=1`)
            .then(response => response.json())
            .then(data => data.data.children.map( d => {
                console.log(d.data.url)
                //Store for converting sale date from epoch time
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`No Context XBL Message`)
                .addField(`Message` , `$${d.data.url}`)
                message.channel.send(embed);

                delete embed;
                
            }));
        return;
    }
};
