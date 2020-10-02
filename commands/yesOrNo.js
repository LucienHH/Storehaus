const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'yesorno',
    description: 'Yes or No? Find out! To run, type `!yesorno`',
    cooldown: 5,
    usage: ` will James be fired today?`,
    execute(message, args) {
        var percentage =  Math.floor((Math.random() * 100) + 1); 
        if (percentage > 51) {
            message.channel.send(`>>> Yes.`);
            return;
        }
        else{
            message.channel.send(`>>> No.`);
        }

    },
};