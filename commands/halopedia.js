const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

module.exports = {
    name: 'halopedia',
    description: 'Retrieve a random article from the Halo lore website Halopedia.org. To run, try `!halopedia random`',
    cooldown: 5,
    async execute(message, args) {
        let option = args.slice(0).join(" ");

        //Get random article from Halopedia
        //The reason this requires random is because we would like to add great functionality to this command in the future
        //if (option !== "random")
        //{
        //message.channel.send("K you said nothing, Kevin.");
        //}
        //if(option == "random"){
        fetch(`https://www.halopedia.org/api.php?list=random&action=query&format=json&rnlimit=1&rnnamespace=0`)
            .then(response => response.json())
            .then(data => {
                console.log(data.query.random.map(d => {
                    console.log(d)
                    //modify title string so URL works
                    halopediaTitle = d.title.split(" ").join("%20")
                    console.log(halopediaTitle)
                    let embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .addField("Random article from Halopedia" ,d.title)
                    .addField("Read more about this article at" ,`https://www.halopedia.org/${halopediaTitle}`)
                    .setFooter("Halo lore retrieved from Halopedia.org");
                    message.channel.send(embed);
                }))
            }
            );
            delete embed;

        return;
        //}
        //end random retrieval
    }
};
