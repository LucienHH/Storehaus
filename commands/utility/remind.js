const Discord = require('discord.js');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'remind',
    category: 'utility',
    aliases: ['reminder'],
    description: 'Use storehaus to set periodic reminders to your server!',
    usage: `!remind`,
    cooldown: 10,
    execute(message, args) {
        let reminderOption = args[0] ? args[0].toLowerCase() : null;
        // console.log(reminderMessage);

        //#region MAIN FUNCTIONS
        function setup(msg) {
            setReminderChannel(msg)
        }
        function edit(msg) {

        }
        function remove(msg) {

        }
        function view(msg) {

        }
        function invalid(msg) {
            embed = new Discord.MessageEmbed()
                .setTitle("Invalid option")
                .setColor("#ff0000")
                .setDescription("You have chosen an invalid option. Choose one of the following")
                .addField("Setup", "A wizard to guide you through setting up a periodic reminder")
                .addField("Edit", "Edit your reminders")
                .addField("Delete", "Remove a reminder from the server")
                .addField("View", "View your current server reminders");
            msg.edit(embed);
            delete embed;
        }
        //#endregion

        //#region  SUB FUNCTIONS
        function setReminderChannel(msg) {
            embed = new Discord.MessageEmbed()
                .setTitle("Set reminder channel")
                .setDescription("Tag a channel in which you want to send the reminders. Alternatively paste the channel id.")
                .setFooter("You have 60 seconds to submit this information");

            msg.edit(embed).then(async msg => {
                msg.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async collected => {
                    let channel = collected.first();
                    console.log(channel.content);
                    collected.first().delete()

                    //check if channel can be found by bot
                    if (message.guild.channels.cache.find(c => c.id == channel.content.replace(/\D/g, ''))) {
                        rChannel = message.guild.channels.cache.find(c => c.id == channel.content.replace(/\D/g, '')).name
                        setReminderTime(msg)
                    } else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Channel not found")
                            .setDescription("Could not find the Channel specified. Make sure that you're pasting either the mention or the id. Othwerwise ensure the bot has access to the channel")
                            .setColor("#ff0000");

                        msg.edit(embed);
                    }

                })
            })
        }
        function setReminderTime(msg) {
            embed = new Discord.MessageEmbed()
                .setTitle("Set reminder time")
                .setDescription("Choose how often the message should be repeated. E.g. `10 D` would send the message every 10 days")
                .setFooter("You have 60 seconds to submit this information");

            msg.edit(embed).then(async msg => {
                msg.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async collected => {
                    let time = collected.first();
                    // console.log(time.content);
                    collected.first().delete()
                    let timeSplit = time.content.split(" ");
                    if (!isNaN(timeSplit[0])) {
                        console.log("is a number");
                        if (timeSplit[1].toLowerCase() == "m"
                        || timeSplit[1].toLowerCase() == "h"
                        || timeSplit[1].toLowerCase() == "d") {
                            console.log("Time unit valid");
                            rTime = time.content;
                            setReminderMessage(msg);
                        }
                    }

                })


            })
        }
        function setReminderMessage(msg) {
            embed = new Discord.MessageEmbed()
                .setTitle("Set reminder message")
                .setDescription("Choose how often the message should be repeated. E.g. `10 D` would send the message every 10 days")
                .setFooter("You have 60 seconds to submit this information");

            msg.edit(embed).then(async msg => {
                msg.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async collected => {
                    let reminderMessage = collected.first();
                    console.log(reminderMessage.content);
                    collected.first().delete()
                    rMessage = reminderMessage.content;
                    confirmReminder(msg,rChannel,rTime,rMessage)
                })
            })
        }
        function confirmReminder(msg,rChannel,rTime){
            timeUnit = "";
            if (rTime.split(" ")[1].toLowerCase() == "d") {
                timeUnit = "day(s)";
            }
            if (rTime.split(" ")[1].toLowerCase() == "h") {
                timeUnit = "hour(s)";
            }
            if (rTime.split(" ")[1].toLowerCase() == "m") {
                timeUnit = "minute(s)";
            }
            embed = new Discord.MessageEmbed()
            .setTitle("Your new periodic message")
            .setDescription("Here's a short summary of your message")
            .addField("Channel", rChannel)
            .addField("Time period", `${rTime.split(" ")[0]} ${timeUnit}`)
            .addField("Message", rMessage)
            msg.edit(embed);
        }
        //#endregion

        //#region  MAIN
        let embed = new Discord.MessageEmbed().setTitle(".");
        message.channel.send(embed).then(msg => {
            switch (reminderOption) {
                case "setup":
                    setup(msg);
                    break;
                case "edit":
                    edit(msg);
                    break;
                case "delete":
                    remove(msg);
                    break;
                case "view":
                    view(msg);
                    break;
                default:
                    invalid(msg);
                    break;
            }
        })
        //#endregion
    }
};