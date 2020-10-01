const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'ligma',
    aliases: [],
    description: 'Do you have ligma? What about one of your friends? To run, type `!ligma`',
    cooldown: 5,
    usage: ` or !ligma @slashstorm`,
    execute(message, args) {
        let option = args.slice(0).join(" ");
        var percentage =  Math.floor((Math.random() * 100) + 1); 
        if (option == undefined || option=="" || option == "@everyone" || option == "@here") {
            message.channel.send(`>>> There is a ${percentage}% probability that you have ligma.`);
            return;
        }
        else{
            message.channel.send(`>>> There is a ${percentage}% probability that ${option} has ligma.`);
        }

    },
};