const Discord = require('discord.js');
const client = new Discord.Client();

const readline = require('readline');
const fs = require('fs');
module.exports = {
    name: 'playanywhere',
    aliases: [],
    description: 'Check if a game is a Xbox Play Anywhere title. To run, type `!playanywhere name of game`',
    cooldown: 5,
    usage: ` Gears 5`,
    execute(message, args) {
        let playAnywhere = args.slice(0).join(" ");
        if (playAnywhere == undefined || playAnywhere=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a game to see if it is a play anywhere title")).then(m => m.delete({timeout: 10000}));
            return;
        }
        console.log(playAnywhere)
        //User input to lower case
        var lowerCaseGame = playAnywhere.toLowerCase();
        //Reads each line from text file that supplies lines of dialogue. Picks on at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/PlayAnywhere.txt').toString().split("\n");

        //Remove the \r and \n of each element in the array
        for (var i = 0 ; i != array.length ; i++) {
            array[i] = array[i].trim();
        }

        //Sends array to lower case
        sorted=array.join('|').toLowerCase().split('|');

        if (sorted.indexOf(lowerCaseGame) > -1) {
            //In the array
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .addField(`Play Anywhere Compatibility`, ` Yay! ${playAnywhere} **is** a Play Anywhere title!`)
            .setFooter(`Try !playtime ${lowerCaseGame} to see how long it takes to complete it.`)
            message.channel.send(embed);
            delete embed;

        } else {
            //Not in the array
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .addField(`Play Anywhere Compatibility`, ` Oh no, ${playAnywhere} **is not** Play Anywhere title. How sad :(`)
            .setFooter("Is your input correct? Maybe check your spelling and try again.")
            message.channel.send(embed);
            delete embed;
            

        }
    },
};