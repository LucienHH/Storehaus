const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'random',
    category: 'fun',
    aliases: [],
    description: 'Have Storehaus suggest a command for you to try out.`',
    cooldown: 5,
    usage: ` `,
    execute(message, args) {
        //Reads each line from text file that supplies command list. Picks one at random and displays it.
        var fs = require('fs');
        var array = fs.readFileSync('textfiles/CommandList.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        var choppedQuote = array[quote].substring(1);
        message.channel.send(`>>> Try out ${array[quote]} Unsure how it works? Try !help ${choppedQuote}`);
    },
};
