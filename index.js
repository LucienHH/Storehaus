require('dotenv').config({ path: require('find-config')('.env') });
const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
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
	const helpers = require('./helpers/helpers')
	let guild = message.guild.id;
	// console.log(guild);
	var con = helpers.connectMYSQL();
	con.query(`SELECT * FROM ${process.env.mysql_guilds_table} where guild_id = ${guild}`, function (err, results) {
		//guild found, check for prefix
		let guildID = results[0].id;
		if (results.length == 1) {
			con.query(`SELECT * FROM ${process.env.mysql_prefixes_table} WHERE guild_id = ${guildID}`, function (err, results_) {

				results_.length == 1 ? helpers.prefix = results_[0]['prefix'] : helpers.prefix = process.env.prefix;

				if (!message.content.startsWith(helpers.prefix) || message.author.bot) return;

				const args = message.content.slice(helpers.prefix.length).split(/ +/);
				const commandName = args.shift().toLowerCase();
				const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));

				if (!command) return;

				try {
					command.execute(message, args);
				} catch (error) {
					console.error(error);
					message.reply('there was an error trying to execute that command!');
				}
			})

		} else {
			//guild not found, add to the database, then check for default prefix
			con.query(`INSERT INTO ${process.env.mysql_guilds_table} VALUES (NULL, ${guild})`, function (err, results) {

			})
		}
	})
	///
	///CHECK WHETHER DEFAULT PREFIX OR GUILD CUSTOM PREFIX IS BEING USED
	///
});

client.login(process.env.token);
