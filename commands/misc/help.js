require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
//required
const fs = require('fs');
const prefix = process.env.prefix;
const helpers = require('../../helpers/helpers');
module.exports = {
    name: 'help',
    category: "misc",
    aliases: [],
    description: 'List info about a specific command.',
    cooldown: 2,
    usage: '[command name]',
    execute(message, args, client) {
        const data = [];
        const { commands } = message.client;
        //// ----------Leaving this commented out in case we use it in the future---------------////
        // if (!args.length) {
        //     // Sends a DM to author of all commands
        //     data.push('Here\'s a list of all my commands:');
        //     commands.map(command => {
        //         if(command.name.charAt(0)!='_'){
        //             data.push(command.name)
        //         }
        //     });
        //     data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
        //     return message.author.send(data, { split: true })
        //         .then(() => {
        //             if (message.channel.type === 'dm') return;
        //             message.reply('I\'ve sent you a DM with all my commands!');
        //         })
        //         .catch(error => {
        //             console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        //             message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
        //         });
        // //------------------------------------------------------------------------------//
        let name = args.slice(0).join(" ");

        if (name == undefined || name == "") {
            //message.channel.send(new Discord.MessageEmbed().setTitle("Try !help `name of a command`. To view all commands, type `!about`"));
            let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle("Storehaus Commands List")
                .addField("🎮 Gaming Commands", "To see more detailed info, run `!help gaming`")
                .addField("😂 Fun Commands", "To see more detailed info, run `!help fun`")
                .addField("⚙️ Misc Commands", "To see more detailed info, run `!help misc`")
            embed.setFooter(helpers.getFooter());
            message.channel.send(embed);
            delete embed;
            return;
        }
        else if (name.toLowerCase() == "gaming") {
            let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Gaming Commands`)
            const cmd = client.commands;
            let string = "";
            cmd.forEach(element => {
                if (element.category == 'gaming') {
                    // console.log(element.name);
                    string += `!${element.name}\n`
                }
            });
            embed.addField(string, `\u200b`);
            message.channel.send(embed)
        }
        else if (name.toLowerCase() == "fun") {
            let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Fun Commands`)
            const cmd = client.commands;
            let string = "";
            cmd.forEach(element => {
                if (element.category == 'fun') {
                    // console.log(element.name);
                    string += `!${element.name}\n`
                }
            });
            embed.addField(string, `\u200b`);
            message.channel.send(embed)
        }
        else if (name.toLowerCase() == "misc") {
            let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Misc Commands`)
            const cmd = client.commands;
            let string = "";
            cmd.forEach(element => {
                if (element.category == 'misc') {
                    // console.log(element.name);
                    string += `!${element.name}\n`
                }
            });
            embed.addField(string, `\u200b`);
            message.channel.send(embed)
        }
        else {
            const command = args[0].toLowerCase();
            if (client.commands.has(command)) {
                cmd = client.commands.get(command);
                const embed = new Discord.MessageEmbed().setColor('00FF00');
                cmd.name ? embed.setTitle(`Help for **\`${cmd.name}\`**`) : null;
                cmd.aliases.length > 0 ? embed.addField('Aliases', `${cmd.aliases.join(', ')}`) : null;
                cmd.description ? embed.addField('Description', `${cmd.description}`) : null;
                cmd.usage ? embed.addField('Usage', `${prefix}${cmd.name} ${cmd.usage}`) : null;
                cmd.cooldown ? embed.addField('Cooldown', `${cmd.cooldown} seconds`) : null;

                message.channel.send(embed);
                return;
            }
            else if (client.aliases.has(command)) {
                cmd = client.commands.get(client.aliases.get(command));
                const embed = new Discord.MessageEmbed().setColor('00FF00');
                cmd.name ? embed.setTitle(`Help for **\`${cmd.name}\`**`) : null;
                cmd.aliases.length > 0 ? embed.addField('Aliases', `${cmd.aliases.join(', ')}`) : null;
                cmd.description ? embed.addField('Description', `${cmd.description}`) : null;
                cmd.usage ? embed.addField('Usage', `${prefix}${cmd.name} ${cmd.usage}`) : null;
                cmd.cooldown ? embed.addField('Cooldown', `${cmd.cooldown} seconds`) : null;

                message.channel.send(embed);
                return;
            }
            else {
                return message.reply('That command doesn\'t exist!');
            }
        }
    }
};