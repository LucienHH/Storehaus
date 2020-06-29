const { get } = require('../helpers/crud')

module.exports = {
	name: 'gameinfo',
	description: 'Discover when a game released!',
    cooldown: 5,
	execute(message, args) {
		get("https://api-v3.igdb.com/games", "game", message, args)
	},
};