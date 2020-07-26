const Discord = require('discord.js');
const client = new Discord.Client();

//const botStats = require('../helpers/stats')
module.exports = {
    name: 'gif',
    description: 'Send a random gif! Gifs are picked at random. To run, type `!gif`',
    cooldown: 5,
    execute(message, args) {
        //Reads each line from text file that supplies gifs. Picks one at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/gif.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        message.channel.send(array[quote]);
    },
};