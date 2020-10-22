require('dotenv').config({ path: require('find-config')('.env') });
const { log } = require('console');
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

        function SendCommandList(msg,page, category) {
            let count = 0
            let embed = new Discord.MessageEmbed()
            embed.setColor("#ff00ff")
                .setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} Commands. Page ${page}`)

            const cmd = client.commands;
            cmd.forEach(element => {
                if (element.category == category) {
                    // console.log(element.name);
                    if (page == 1) {
                        if (count <= 20) {
                            embed.addField(element.name, element.description, true)
                        }

                    }
                    if (page == 2) {
                        if (count > 20 && count <= 40) {
                            embed.addField(element.name, element.description, true)
                        }
                    }
                    if (page == 3) {
                        if (count > 40 && count <= 60) {
                            embed.addField(element.name, element.description, true)
                        }
                    }
                    count++;
                }
            });
            console.log(page);
            embed.setFooter("React with ⬅️ and ➡️ to navigate!")
            message.channel.messages.fetch(msg).then(a => a.edit(embed)).then(function (message_) {
                message_.reactions.removeAll();
                if (count > 20 && count <= 40 && page == 1) { //page 1 shown but page 2 available

                    message_.react('➡️');
                    const filter = (reaction, user) => {
                        return ['➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
                    };

                    message_.awaitReactions(filter, { max: 1,time: 60000 * 5, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();

                            if (reaction.emoji.name === '➡️') {
                                SendCommandList(msg,2, category)
                            }
                        })
                }

                if (count > 20 && count <= 40 && page == 2) { //page 2 shown with page 1 available

                    message_.react('⬅️');
                    const filter = (reaction, user) => {
                        return ['⬅️'].includes(reaction.emoji.name) && user.id === message.author.id;
                    };

                    message_.awaitReactions(filter, { max: 1,time: 60000 * 5, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();

                            if (reaction.emoji.name === '⬅️') {
                                SendCommandList(msg,1, category)
                            }
                        })
                }

                if (count > 40 && count <= 60 && page == 2) { //page 1 or 2 shown with page 3 availble

                    message_.react('⬅️');
                    message_.react('➡️');

                    const filter = (reaction, user) => {
                        return ['⬅️','➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
                    };

                    message_.awaitReactions(filter, { max: 1,time: 60000 * 5, errors: ['time'] })
                        .then(collected => {
                            const reaction = collected.first();

                            if (reaction.emoji.name === '⬅️') {
                                SendCommandList(msg,1, category)
                            }
                            if (reaction.emoji.name === '➡️') {
                                SendCommandList(msg,3,category)
                            }
                        })
                }
            });
        }
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
        let name = args.slice(0).join(" ").toLowerCase();

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
        else if (name == "gaming") {
            let embed = new Discord.MessageEmbed().setTitle('\u200b');
            message.channel.send(embed).then(a => {
                SendCommandList(a.id,1,"gaming");
            })
        }
        else if (name == "fun") {
            let embed = new Discord.MessageEmbed().setTitle('\u200b');
            message.channel.send(embed).then(a => {
                SendCommandList(a.id,1,"fun");
            })
        }
        else if (name == "misc") {
            let embed = new Discord.MessageEmbed().setTitle('\u200b');
            message.channel.send(embed).then(a => {
                SendCommandList(a.id,1,"misc");
            })
        }
        else {
            const command = args[0];
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