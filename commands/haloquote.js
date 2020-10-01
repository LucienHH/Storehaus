const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'haloquote',
    aliases: [],
    description: 'Send a line of dialogue from the Halo series! Quotes are picked at random. To run, type `!haloquote`',
    cooldown: 5,
    usage: ` `,
    execute(message, args) {
        //Reads each line from text file that supplies lines of dialogue. Picks one at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/HaloLines.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        message.channel.send(`>>> ${array[quote]}`);
    },
};