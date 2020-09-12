const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'invite',
    description: 'Invite Storehaus to your server!',
    cooldown: 0,
    execute(message, args) {

        message.channel.send("https://discord.com/oauth2/authorize?client_id=736204347171405904&scope=bot&permissions=379968")
    },
};