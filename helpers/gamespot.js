require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client_discord_embed = new Discord.MessageEmbed();
var request = require("request");

module.exports.get = function(url, message, args){
    var options = {
        method: 'GET',
        url: url,
        headers: {'user-key': process.env.gamespot_token, accept: 'application/json'},
        jar: 'JAR'
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //Parse response
        body = JSON.parse(body);
        console.log(body);

        let info = new Discord.MessageEmbed()
        .setTitle("Game Review Information")
        .setColor("#008b8b")
        // .addField("Title ", body[0].title)
        // .addField("Review Score ", body[0].score)
        // .addField("Link ", body[0].site_detail_url)
        .setTimestamp();

        message.channel.send(info);
        delete info;
    });
}