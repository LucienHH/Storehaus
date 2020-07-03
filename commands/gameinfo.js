const { get } = require('../helpers/crud')

module.exports = {
	name: 'gameinfo',
	description: 'Discover when a game released! Try !gameinfo `name of game`.',
    cooldown: 5,
	execute(message, args) {
		get("https://api-v3.igdb.com/games", "game", message, args)
	},
};