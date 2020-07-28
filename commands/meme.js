const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    description: 'Get some of the best gaming memes around. Content may contain vulgarity. To run, type `!meme`',
    cooldown: 1,
    async execute(message, args) {
        var array = [`https://www.reddit.com/r/halomemes/random.json?show=all&limit=1`, `https://www.reddit.com/r/skyrimmemes/random.json?show=all&limit=1`, `https://www.reddit.com/r/pcmasterrace/random.json?show=all&limit=1`, `https://www.reddit.com/r/MinecraftMemes/random.json?show=all&limit=1`, `https://www.reddit.com/r/nocontextxboxmessages/random.json?show=all&limit=1` ,`https://www.reddit.com/r/memes/random.json?show=all&limit=1`];
        var subreddit = array[Math.floor(Math.random() * array.length)];
        //Get a random post from subreddit
        fetch(subreddit)
            .then(response => response.json())
            .then(data => {
                var imageLink = data[0].data.children.map(d => d.data.url_overridden_by_dest);
                if (imageLink == undefined || imageLink == "") {
                    imageLink = data[0].data.children.map(d => d.data.url);
                }
                var postTitle = data[0].data.children.map(d => d.data.title);
                imageLink = imageLink.toString(); // converts from object
                const embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField(`${postTitle}` , `${imageLink}`)
                .setImage(imageLink)
                message.channel.send(embed);                
            });
            delete embed;
        return;
    }
};
