require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers');

module.exports = {
    name: 'stats',
    description: 'See stats about Storehaus',
    cooldown: 5,
    async execute(message, args) {

        // First we use guild.members.fetch to make sure all members are cached

        var servers = message.client.guilds.cache.size;
        var channels = message.client.channels.cache.size;
        var users = message.client.users.cache.size
        // message.channel.send(`Servers: ${servers}`)
        // message.channel.send(`Channels: ${channels}`)


        const { commands } = message.client
        helpers.pool.getConnection(function (err, connection) {
            connection.query(`SELECT command_name, COUNT(*) count FROM ${process.env.mysql_command_stats_table} GROUP BY command_name  HAVING count > 0 ORDER BY count DESC`, function (err, result) {

                    helpers.pool.getConnection(function(err,connection){
                        connection.query(`SELECT * FROM ${process.env.mysql_command_stats_table}`, function (err, results) {
                            // console.log(fullDate.toString());
                
                            var d1 = new Date();
                            d1.toUTCString();
                            Math.floor(d1.getTime()/ 1000)
                            var date = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
                            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                
                
                            
                            results.forEach(element => {
                                const diffDays = Math.round(Math.abs((element.date - date) / oneDay));
                                let D = element.date;
                                D.setDate(D.getDate() + 1);
                                if (diffDays >= 6) {
                                    connection.query(`DELETE FROM ${process.env.mysql_command_stats_table} WHERE date = "${new Date(Date.parse(D)).toISOString().slice(0, 10).replace('T', ' ')}"`,function(err,result){
                                        if (err) {
                                            console.log(err);
                                            console.log(`Something went wrong. If the issue persists contact the developers. \`!support\``);
                                        }else{
                                            console.log(`deleted ${new Date(Date.parse(D)).toISOString().slice(0, 10).replace('T', ' ')}`);
                                        }
                                    })
                                } 
                                    // console.log(element.date);
                                });
                                connection.release();
                        })	
                    })

                                let embed = new Discord.MessageEmbed()
                                    .setColor("#ff00ff")
                                    .addField(`Stats`, `Servers: ${servers}\n Channels: ${channels}\n Users: ${users}`)
                                    .addField(`Top command usage stats`, `
${result[0]?result[0].command_name:""} ${result[0]?"-":""} ${result[0]?result[0].count:""}
${result[1]?result[1].command_name:""} ${result[1]?"-":""} ${result[1]?result[1].count:""}
${result[2]?result[2].command_name:""} ${result[2]?"-":""} ${result[2]?result[2].count:""}
${result[3]?result[3].command_name:""} ${result[3]?"-":""} ${result[3]?result[3].count:""}
${result[4]?result[4].command_name:""} ${result[4]?"-":""} ${result[4]?result[4].count:""}
${result[5]?result[5].command_name:""} ${result[5]?"-":""} ${result[5]?result[5].count:""}
${result[6]?result[6].command_name:""} ${result[6]?"-":""} ${result[6]?result[6].count:""}
${result[7]?result[7].command_name:""} ${result[7]?"-":""} ${result[7]?result[7].count:""}
${result[8]?result[8].command_name:""} ${result[8]?"-":""} ${result[8]?result[8].count:""}
${result[9]?result[9].command_name:""} ${result[9]?"-":""} ${result[9]?result[9].count:""}`);
                //the above must stay indented
                                message.channel.send(embed)
            })
        })


    }

}