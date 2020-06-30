const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'haloquote',
    description: 'Send a line of dialogue from the Halo series! Quotes are picked at random.',
    cooldown: 5,
    execute(message, args) {
        //Reads each line from text file that supplies lines of dialogue. Picks on at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('halolines.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        message.channel.send(array[quote]);
    },
};