const { get } = require('../../helpers/crud')

module.exports = {
	name: 'gameinfo',
	category: 'gaming',
	aliases: [`info`],
	description: 'Discover when a game released! To run, type `!gameinfo name of game`',
	cooldown: 5,
	usage: ' Halo Wars',
	execute(message, args) {
	// 	get("https://api-v3.igdb.com/games", "game", message, args)
		message.channel.send('This command currently doesnt work :( we are working on it!')
	 },
	
};