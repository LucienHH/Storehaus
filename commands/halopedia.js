const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'halopedia',
    description: 'Retrieve a random article from the Halo lore website Halopedia.org. To run, try `!halopedia random`',
    cooldown: 5,
    usage: `random or !halopedia master chief`,
    async execute(message, args) {
        let option = args.slice(0).join(" ");
        if (option == undefined || option=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("Try `!halopedia random` or `!halopedia [article]`")).then(m => m.delete({timeout: 10000}));
            return;
        }

        if(option != "random"){
            var request = require('request');// need this for below to work 
        
            var url = `https://www.halopedia.org/api.php?format=json&limit=3&action=opensearch&search=${args[0]}`;
            
            request.get({
                url: url,
                json: true,
                headers: {'User-Agent': 'request'}
              }, (err, res, data) => {
                if (err) {
                  console.log('Error:', err);
                }
                else {
                // data is already parsed as JSON:
                let embed = new Discord.MessageEmbed()
                .setTitle("Halopedia articles:")
                .addField(data[1][0],data[3][0])
                .addField(data[1][1],data[3][1])
                .addField(data[1][2],data[3][2])
                .setFooter(helpers.getFooter());
                message.channel.send(embed);
                }
            });
            }
            
        //Get random article from Halopedia
        if(option == "random"){
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
                    .setFooter(helpers.getFooter())
                    message.channel.send(embed);
                }))
            }
            );
            delete embed;

        return;
        }
        //end random retrieval
    }
};
