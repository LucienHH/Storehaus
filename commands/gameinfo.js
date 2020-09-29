const { get } = require('../helpers/crud')

module.exports = {
	name: 'gameinfo',
	aliases: [`info`],
	description: 'Discover when a game released! To run, type `!gameinfo name of game`',
	cooldown: 5,
	usage: ' Halo Wars',
	execute(message, args) {
		get("https://api-v3.igdb.com/games", "game", message, args)
	},
};