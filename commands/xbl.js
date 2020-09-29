const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'xbl',
    description: 'Get no context Xbox Live messages from the subreddit r/nocontextxboxmessages. Content may contain vulgarity. To run, type `!xbl`',
    cooldown: 5,
    usage: ` `,
    async execute(message, args) {
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/InsultsAndCompliments.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        //Get a random post from subreddit
        fetch(`https://www.reddit.com/r/nocontextxboxmessages/random.json?show=all&limit=1`)
            .then(response => response.json())
            .then(data => {
                var imageLink = data[0].data.children.map(d => d.data.url_overridden_by_dest);
                imageLink = imageLink.toString(); // converts from object
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`No Context XBL Message`)
                .addField(`Message` , `${imageLink}`)
                .setImage(imageLink)
                .setFooter(array[quote]);
                message.channel.send(embed);                
            });
            delete embed;
        return;
    }
};
