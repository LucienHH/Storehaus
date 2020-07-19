require('dotenv').config({ path: require('find-config')('.env') });
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

//This is for REST API.
const fetch = require('node-fetch');
const querystring = require('querystring');

client.commands = new Discord.Collection();

/// GO THROUGH EVERY FILE IN COMMANDS FOLDER AND GRAB ALL JS FILES
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
	console.log('Ready to go!');

	client.user.setActivity(`!about in ${client.guilds.cache.size} servers`, {
		type: "STREAMING",
		//url: "Some URL here"
	});
});

client.on('message', async message => {
	if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

	const args = message.content.slice(process.env.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));

	if (!command) return;

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.token);
