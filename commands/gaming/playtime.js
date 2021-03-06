const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
        name: 'playtime',
        category: 'gaming',
        aliases: [],
	description: 'Get information about the time to beat and complete a game. To run, type `!playtime name of game`!',
        cooldown: 5,
        usage: ` Borderlands`,
	execute(message, args) {
        let game = args.slice(0).join(" ");
        if (game == undefined || game=="") {
                message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a game to check the playtime")).then(m => m.delete({timeout: 10000}));
                return;
            }

        //Related to howlongtobeat.com
        let hltb = require('howlongtobeat');
        let hltbService = new hltb.HowLongToBeatService();

        //Fields returned for howlongtobeat API
        fields = 'id, name, description, playableOn, imageUrl, timeLabels, gameplayMain, gameplayMainExtra, gameplayCompletionist, similarity;'
        hltbService.search(game).then(result => {

                //Parse JSON results
                body = JSON.parse(JSON.stringify(result));

                //Display Returned API Results
                let info = new  Discord.MessageEmbed()
                .setTitle("Game Completion Information")
                .setColor("#008b8b")
                .addField("Title ", body[0].name)
                .addField("Main Campaign Time: ", body[0].gameplayMain + " hours")
                .addField("Main Campaign + DLC Time: ", body[0].gameplayMainExtra + " hours")
                .addField("100% Completionist Time: ", body[0].gameplayCompletionist + " hours")
                .setFooter("This data is from IGDB. Support them at https://www.igdb.com/discover")
        
                message.channel.send(info);
                delete info;
        })
	},
};