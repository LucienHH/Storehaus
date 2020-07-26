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

const cooldowns = new Discord.Collection();
client.once('ready', () => {
	console.log('Ready to go!');

	client.user.setActivity(`!about in ${client.guilds.cache.size} servers`, {
		type: "STREAMING",
		//url: "Some URL here" 
		//asdasdasda
	});
});

client.on('message', async message => {
	try {
		const helpers = require('./helpers/helpers')
		let guild = message.guild.id;
		// console.log(guild);
		var con = helpers.connectMYSQL();
		con.query(`SELECT * FROM ${process.env.mysql_guilds_table} where guild_id = ${guild}`, function (err, results) {
			//guild found, check for prefix
			let guildID = results[0].id == undefined ? 0 : results[0].id


			console.log(results);
			if (results.length == 1) {
				con.query(`SELECT * FROM ${process.env.mysql_prefixes_table} WHERE guild_id = ${guildID}`, function (err, results_) {


					try {
						results_.length == 1 ? helpers.prefix = results_[0]['prefix'] : helpers.prefix = process.env.prefix;
					} catch (error) {
						console.log("OMG AN ERROR OCCURED: " + error);
					}

					if (!message.content.startsWith(helpers.prefix) || message.author.bot) return;

					const args = message.content.slice(helpers.prefix.length).split(/ +/);
					const commandName = args.shift().toLowerCase();
					const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));

					if (!command) return;

					//Implement Cooldowns, prevent spam
					if (!cooldowns.has(command.name)) {
						cooldowns.set(command.name, new Discord.Collection());
					}

					const now = Date.now();
					const timestamps = cooldowns.get(command.name);
					const cooldownAmount = (command.cooldown || 3) * 1000;

					if (timestamps.has(message.author.id)) {
						const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

						if (now < expirationTime) {
							const timeLeft = (expirationTime - now) / 1000;
							return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(m => m.delete({ timeout: 5000 }));
						}
					}
					timestamps.set(message.author.id, now);
					setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
					//End Cooldown implementation


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
	} catch (error) {
		console.log("REEE");
	}
	///
	///CHECK WHETHER DEFAULT PREFIX OR GUILD CUSTOM PREFIX IS BEING USED
	///
});

client.login(process.env.token);
