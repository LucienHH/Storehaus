const Discord = require('discord.js');
const client = new Discord.Client();
const botStats = require('../helpers/botstats')
module.exports = {
    name: '8ball',
    description: 'Leave the most important decisions up to random! To run, type `!8BALL`',
    cooldown: 5,
    execute(message, args) {
        //Reads each line from text file that supplies lines of dialogue. Picks one at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/8ball.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        message.channel.send(`>>> ${array[quote]}`);
        botStats.haloquote ++;
    },
};