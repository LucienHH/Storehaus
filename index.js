require('dotenv').config({ path: require('find-config')('.env') });
const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const client = new Discord.Client();
const helpers = require('./helpers/helpers')

//This is for REST API.
const fetch = require('node-fetch');
const querystring = require('querystring');
const { log } = require('console');

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
	//Sends a message to TR Dev server acknoledging reboot
	client.channels.cache.get('727953467443773460').send('Storehaus has been rebooted.');
	client.user.setActivity(`!help in ${client.guilds.cache.size} servers`);
	
	setInterval(() => {
		helpers.pool.getConnection(function(err,connection){
			connection.query(`SELECT * FROM ${process.env.mysql_command_stats_table}`, function (err, results) {
	
				var d1 = new Date();
				d1.toUTCString();
				Math.floor(d1.getTime()/ 1000)
				var date = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
				const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	
	
				
				results.forEach(element => {
					const diffDays = Math.round(Math.abs((element.date - date) / oneDay));
					let D = element.date;
					if (diffDays >= 8) {
						connection.query(`DELETE FROM ${process.env.mysql_command_stats_table} WHERE date = "${new Date(Date.parse(D)).toISOString().slice(0, 10).replace('T', ' ')}"`,function(err,result){
							if (err) {
								console.log(err);
								console.log(`Something went wrong. If the issue persists contact the developers. \`!support\``);
							}else{

							}
						})
					} 
					});
					connection.release();
			})	
		})
	},   1000 * 60 * 60 * 24);
	setInterval(() => {
		client.user.setActivity(`!help in ${client.guilds.cache.size} servers`, {
			type: "STREAMING",
			//url: "Some URL here" 
		});

	}, 1000 * 60 * 5);
	//From https://stackoverflow.com/questions/60225366/how-do-i-make-a-bot-status-that-has-membercount-on-it

});

client.on('message', async message => {
	try {
		let guild = message.guild.id;
		helpers.pool.getConnection(function(err, connection) {
			if (err) throw err; // not connected!
		   
			// Use the connection
			connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`,function(err,user_result){
				if (user_result == undefined) {
					connection.query(`INSERT INTO ${process.env.mysql_users_table} VALUES (NULL, ${message.author.id})`)
				}else if(user_result == 0){
					connection.query(`INSERT INTO ${process.env.mysql_users_table} VALUES (NULL, ${message.author.id})`)
				}else{
					//nothing
				}
			})
			connection.query(`SELECT * FROM ${process.env.mysql_guilds_table} where guild_id = "${guild}"`, function (err, results) {
				if (err) {
					console.log(err);
				}
				//guild found, check for prefix
				// console.log(results);
	
			
				if (results.length == 1) {
					connection.query(`SELECT * FROM ${process.env.mysql_prefixes_table} WHERE guild_id = ${results[0]['id']}`, function (err, results_) {
						if (err) {
							console.log(err);
						}
	
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
							command.execute(message, args, client);
							///INSERT COMMAND NAME TO DATABASE 

							connection.query(`INSERT INTO ${process.env.mysql_command_stats_table} VALUES ("${command.name}", DEFAULT)`,function(err,results){
								if (err) {
									console.log(err);
								}
							})

							///
							
						} catch (error) {
							console.error(error);
							message.reply('there was an error trying to execute that command!');
						}
					})
	
				} else {
					//guild not found, add to the database, then check for default prefix
					connection.query(`INSERT INTO ${process.env.mysql_guilds_table} VALUES (NULL, ${guild})`, function (err, results) {
						connection.query(`SELECT * FROM ${process.env.mysql_guilds_table} where guild_id = "${guild}"`, function (err, results) {
							if (err) {
								console.log(err);
							}
							if (results.length == 1) {
								connection.query(`SELECT * FROM ${process.env.mysql_prefixes_table} WHERE guild_id = ${results[0]['id']}`, function (err, results_) {
									if (err) {
										console.log(err);
									}
	
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
										command.execute(message, args, client);
									} catch (error) {
										console.error(error);
										message.reply('there was an error trying to execute that command!');
									}
								})
	
							}
						})
					})
				}
			})
			  // When done with the connection, release it.
			//   console.log(connection._pool.config.connectionLimit)     // passed in max size of the pool
			//   console.log(connection._pool._freeConnections.length)    // number of free connections awaiting use
			//   console.log(connection._pool._allConnections.length)     // number of connections currently created, including ones in use
			//   console.log(connection._pool._acquiringConnections.length) // number of connections in the process of being acquired
			connection.query(`ALTER TABLE ${process.env.mysql_command_stats_table} AUTO_INCREMENT = 1;`)
			connection.release();
		   
			  // Handle error after the release.
			//   if (error) throw error;
		   
			  // Don't use the connection here, it has been returned to the pool.

		  });
	} catch (error) {
		console.log(error);
	}
	///
	///CHECK WHETHER DEFAULT PREFIX OR GUILD CUSTOM PREFIX IS BEING USED
	///
});

client.login(process.env.token);