const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'invite',
    description: 'test command!',
    cooldown: 0,
    execute(message, args) {

        message.channel.send("https://discordapp.com/oauth2/authorize?client_id=736204347171405904&scope=bot&permissions=8")
    },
};