const Discord = require('discord.js');
const { connect } = require('snekfetch');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'customcmd',
    category: 'fun',
    aliases: ['customcommand'],
    description: 'Ping a random person! To get blacklisted use `!someone blacklist`, to whitelist yourself again do `!someone whitelist`. Formerly the main feature of KappaBot. [*]',
    cooldown: 7200,
    usage: ` `,
    execute(message, args) {

        let option = args[0].toLowerCase();

        //#region functions
        function setCommandName(msg) {
            embed = new Discord.MessageEmbed()
                .setTitle("Set command name")
                .setDescription("Set the name for your command. Typing `welcome` would trigger the command with !welcome [replace `!` with your guild's prefix]")
                .setFooter("You have 60 seconds to submit this information");

            msg.edit(embed).then(async msg => {
                msg.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000 }).then(async collected => {
                    let cmdName = collected.first();
                    // console.log(time.content);
                    collected.first().delete()
                    cName = cmdName.content;
                    setCommandContent(msg)

                })


            })
        }

        function setCommandContent(msg) {
            embed = new Discord.MessageEmbed()
                .setTitle("Set command message")
                .setDescription("Choose a message to be send every time the command is triggered")
                .setFooter("You have 60 seconds to submit this information");

            msg.edit(embed).then(async msg => {
                msg.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000 }).then(async collected => {
                    let cmdMessage = collected.first();
                    collected.first().delete()
                    cMessage = cmdMessage.content;
                    confirmCommand(msg, cName, cMessage)
                })
            })
        }

        function confirmCommand(msg, cName, cMessage) {
            embed = new Discord.MessageEmbed()
            .setTitle("Your new custom command")
            .setDescription("Here's a short summary of your command")
            .addField("Name", cName)
            .addField("Message", cMessage)
            msg.edit(embed);
            


        }
        //#endregion

        let embed = new Discord.MessageEmbed().setTitle(".");
        message.channel.send(embed).then(msg => {
            switch (option) {
                case "create":
                    {
                        setCommandName(msg)
                    }
                case "edit":
                    {

                    }
                case "delete":
                    {

                    }
            }
        })

    }
};