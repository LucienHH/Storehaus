const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: '8ball',
    category: 'fun',
    aliases: [],
    description: 'Leave the most important decisions up to random!',
    cooldown: 5,
    usage: ` should I invite this bot to my server?`,
    execute(message, args) {
        //Reads each line from text file that supplies lines of dialogue. Picks one at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/8ball.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        message.channel.send(`>>> ${array[quote]}`);
    },
};