require('dotenv').config();

const fs = require('fs');

module.exports = {
	get() {
		try {
			const saveRaw = fs.readFileSync('schemas/xbl-auth.json');
			return JSON.parse(saveRaw);
		}
		catch (err) {
			throw new Error(`in helpers/XBLAuthentication/get, couldn't get the auth info: ${err.message}`);
		}
	},

	save(authInfo) {
		try {
			fs.writeFileSync('schemas/xbl-auth.json', JSON.stringify(authInfo), 'utf8');
			return authInfo;
		}
		catch (err) {
			throw new Error(`in helpers/XBLAuthentication/save, couldn't saved the auth info: ${err.message}`);
		}
	},
};
