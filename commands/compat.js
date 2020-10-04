const Discord = require('discord.js');
const client = new Discord.Client();
const FuzzySet = require('fuzzyset.js')
const readline = require('readline');
const fs = require('fs');
module.exports = {
    name: 'compat',
    aliases: [],
    description: 'Check if a game is backwards compatible on Xbox One or Xbox Series X. To run, type `!compat name of game`',
    cooldown: 5,
    usage: 'Halo 3',
    execute(message, args) {
        let game = args.slice(0).join(" ");

        if (game == undefined || game=="") {
            message.channel.send(new Discord.MessageEmbed().setTitle("You must specify a game to check backwards compatibility")).then(m => m.delete({timeout: 10000}));
            return;
        }
        // console.log(game);
        // game = game      
        // .replace(' 5'," V")
        // .replace(' 4'," IV")
        // .replace(' 3'," III")
        // .replace(' 2'," II")
        // .replace(' 1'," I")
        // .replace(/'/g,"’");
        console.log(game)
        // console.log(game)
        //User input to lower case
        var lowerCaseGame = game.toLowerCase();
        //Reads each line from text file that supplies lines of dialogue. Picks on at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/BCXboxGames.txt').toString().split("\n");
        a = FuzzySet(array,false,1,1);
        let result = a.get(lowerCaseGame)[0]
        console.log(result[0])
        console.log(result[1])

        if (result[0] > 0.9) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Closest match: ${result[1]}`)
            .setColor("#ff00ff")
            .addField(`Xbox Backwards Compatibility`, ` Yay! ${result[1]} **is** backwards compatible on Xbox One and Xbox Series X devices.`)
            .setFooter(`Try !playtime ${result[1]} to see how long it takes to complete it.`)
            message.channel.send(embed);
        }else{

                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .addField(`Xbox Backwards Compatibility`, ` Oh no, ${game} **is not** backwards compatible on Xbox One and Xbox Series X devices.`)
                .setFooter("Is your input correct? Maybe check your spelling and try again.")
                message.channel.send(embed);

            }



            // let game = args.slice(0).join(" ");
            // //User input to lower case
            // var lowerCaseGame = game.toLowerCase();
    
            // //Reads each line from text file that supplies lines of dialogue. Picks on at random and displays it.
            // var fs = require('fs');
            // var array = fs.readFileSync('textfiles/BCXboxGames.txt').toString().split("\n");
    
            // //Remove the \r and \n of each element in the array
            // for (var i = 0 ; i != array.length ; i++) {
            //     array[i] = array[i].trim();
            // }
    
            // //Sends array to lower case
            // sorted=array.join('|').toLowerCase().split('|');
    
            // if (sorted.indexOf(lowerCaseGame) > -1) {
            //     //In the array
            //     //message.channel.send(`Yay! `+ game + ' **is** backwards compatible on Xbox One and Xbox Series X devices.');
            //     let embed = new Discord.MessageEmbed()
            //     .setColor("#ff00ff")
            //     .addField(`Xbox Backwards Compatibility`, ` Yay! ${game} **is** backwards compatible on Xbox One and Xbox Series X devices.`)
            //     .setFooter(`Try !playtime ${lowerCaseGame} to see how long it takes to complete it.`)
            //     message.channel.send(embed);
            //     delete embed;
    
            // } else {
            //     //Not in the array
            //     //message.channel.send(`Oh no, `+ game + ' **is not** backwards compatible on Xbox One and Xbox Series X devices.');
            //     let embed = new Discord.MessageEmbed()
            //     .setColor("#ff00ff")
            //     .addField(`Xbox Backwards Compatibility`, ` Oh no, ${game} **is not** backwards compatible on Xbox One and Xbox Series X devices.`)
            //     .setFooter("Is your input correct? Maybe check your spelling and try again.")
            //     message.channel.send(embed);
            //     delete embed;
            // }

        // }
    },
};