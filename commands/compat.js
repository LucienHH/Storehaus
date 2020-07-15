const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'compat',
    description: 'Check if a game is backwards compatible on Xbox One or Xbox Series X. To run, type `!compat name of game`',
    cooldown: 5,
    execute(message, args) {
        let game = args.slice(0).join(" ");
        //User input to lower case
        var lowerCaseGame = game.toLowerCase();

        //Reads each line from text file that supplies lines of dialogue. Picks on at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/BCXboxGames.txt').toString().split("\n");

        //Remove the \r and \n of each element in the array
        for (var i = 0 ; i != array.length ; i++) {
            array[i] = array[i].trim();
        }

        //Sends array to lower case
        sorted=array.join('|').toLowerCase().split('|');

        if (sorted.indexOf(lowerCaseGame) > -1) {
            //In the array
            //message.channel.send(`Yay! `+ game + ' **is** backwards compatible on Xbox One and Xbox Series X devices.');
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .addField(`Xbox Backwards Compatibility`, ` Yay! ${game} **is** backwards compatible on Xbox One and Xbox Series X devices.`)
            .setFooter(`Try !playtime ${lowerCaseGame} to see how long it takes to complete it.`)
            message.channel.send(embed);
            delete embed;

        } else {
            //Not in the array
            //message.channel.send(`Oh no, `+ game + ' **is not** backwards compatible on Xbox One and Xbox Series X devices.');
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .addField(`Xbox Backwards Compatibility`, ` Oh no, ${game} **is not** backwards compatible on Xbox One and Xbox Series X devices.`)
            .setFooter("Is your input correct? Maybe check your spelling and try again.")
            message.channel.send(embed);
            delete embed;
        }
        
    },
};