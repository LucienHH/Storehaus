var mysql = require('mysql');
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');
require('dotenv').config({ path: require('find-config')('.env') });
module.exports = {

    replaceAllSpecialChars: function (string) {

        // return string.replace(pattern, replaceWith);

        var converted = string;

        converted = converted.replace(/&quot;/g, "\"");
        converted = converted.replace(/&#039;/g, "\'");
        converted = converted.replace(/&#039;/g, "é")

        return converted;

    },
    // function to be used for editing previous embeds to errors.
    embedErr: function (message, errMsg) {
        const embedErr = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(errMsg);
        return message.edit(embedErr).then(msg => msg.delete({ timeout: 15000 }));
    },
    // function to be used to send error messages
    sendErr: function (message, errMsg) {
        const embedErr = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(errMsg);
        return message.channel.send(embedErr).then(msg => msg.delete({ timeout: 15000 }));
    },
    // connectMYSQL: function(){
    //         var con = mysql.createPool({
    //         connectionLimit : 10,
    //         host: `${process.env.mysql_host}`,
    //         database: `${process.env.mysql_database}`,
    //         user: `${process.env.mysql_user}`,
    //         password: `${process.env.mysql_password}`
    //       });

    //       return con;
    // },

    arabicToRoman: function (number) {
        let roman = "";
        const romanNumList = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XV: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let a;
        for (let key in romanNumList) {
            a = Math.floor(number / romanNumList[key]);
            if (a >= 0) {
                for (let i = 0; i < a; i++) {
                    roman += key;
                }
            }
            number = number % romanNumList[key];
        }

        return roman;
    },

    getFooter: function () {
        var array = fs.readFileSync('textfiles/tips.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        return array[quote]
    },
    getInsult: function () {
        var array = fs.readFileSync('textfiles/InsultsAndCompliments.txt').toString().split("\n");
        var quote = Math.floor(Math.random() * array.length);
        return array[quote]
    },

    prefix: "!",
    userID: "0",

    pool: mysql.createPool({
        connectionLimit: 10,
        acquireTimeout: 30000,
        host: `${process.env.mysql_host}`,
        database: `${process.env.mysql_database}`,
        user: `${process.env.mysql_user}`,
        password: `${process.env.mysql_password}`
    }),


};