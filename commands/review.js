const { get } = require('../helpers/gamespot')

module.exports = {
	name: 'review',
	description: 'Discover a game review!',
    cooldown: 5,
	execute(message, args) {
		get("http://www.gamespot.com/api/reviews/", "game", message, args)

		//this calls to gamespot.js under helpers folder
	},
};