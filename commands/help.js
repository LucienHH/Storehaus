require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();
//required
const prefix  = process.env.prefix;

module.exports = {
	name: 'help',
	description: 'List all of the bots commands or info about a specific command.',
    cooldown: 5,
    usage: '[command name]',
	execute(message, args) {
        const data = [];
        const { commands } = message.client;
        
        if (!args.length) {
            // Sends a DM to author of all commands
            data.push('Here\'s a list of all my commands:');
            commands.map(command => {
                if(command.name.charAt(0)!='_'){
                    data.push(command.name)
                }
            });
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name);
    
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        //Grabs command info to send to author
        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });

     }
};