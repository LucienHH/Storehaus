const Discord = require('discord.js');
const client = new Discord.Client();
const helpers = require('../../helpers/helpers');
const xboxgt = require('../../schemas/xboxgt.js');
const axios = require('axios');

module.exports = {
    name: 'xboxavatar',
    category: 'gaming',
    aliases: ['xavatar'],
    description: 'Displays your xbox avatar picture.',
    cooldown: 5,
    async execute(message, args) {
        let errMsg = '';
        helpers.pool.getConnection(function (err, connection) {
            connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`, function (err, result_user) {
                connection.query(`SELECT * FROM ${process.env.mysql_xbox_table} WHERE user_id = ${result_user[0].id}`, function (err, result_gamertag) {
                    let Gamertag = args[0];
                    try {
                        if (!args[0]) {
                            Gamertag = result_gamertag && result_gamertag.length == 1 ? result_gamertag[0].gamertag : undefined;
                        }
                    }
                    catch (error) {
                        errMsg = 'Missing input credentials. Do !xboxgc gamer_tag [number]. Or !savegt gamer_tag to save your gamertag then !xboxgc [number].';
                        helpers.sendErr(message, errMsg);
                        return;
                    }
                    if (Gamertag === undefined) {
                        errMsg = 'Error reading your profile this will most likely be due to not having your GT saved to the database. !savegt <gamer_tag>.';
                        helpers.sendErr(message, errMsg);
                        return;
                    }
        
                    const settings = ['GameDisplayPicRaw', 'Gamertag', 'PreferredColor'];
                    const authInfo = await _authenticate();
                    axios({
                        method: 'get',
                        url: `https://profile.xboxlive.com/users/gt(${Gamertag.replace(/_/g, '%20')})/profile/settings`,
                        params: { settings: settings.join(',') },
                        headers: { 'x-xbl-contract-version': 2, 'content-type': 'application/json', Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}` },
                    }).then(async (profile) => {
                        const user = profile.data.profileUsers[0];
                        const url = user.settings[2].value;
                        const colour = await axios.get(url);
            
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`${user.settings[1].value}s' gamerpic: `, `${user.settings[0].value}`)
                            .setColor(`${colour.data.primaryColor}`)
                            .setImage(`${user.settings[0].value}`);
                        message.channel.send({ embed }).then(m => {
                            m.react('❌')
                                .then(r => {
                                    const reactFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                                    m.awaitReactions(reactFilter, { max: 1 })
                                        .then(collected => {
                                            m.delete();
                                            message.delete();
                                        })
                                        .catch(console.error);
                                });
                        });
                    }, error => {
                        if (error) {
                            errMsg = 'Error reading your profile this will most likely be due to your xbox account privacy settings or an invalid gamertag.';
                            helpers.sendErr(message, errMsg);
                            return;
                        }
                    });
                })
            })
            connection.release();
        })


    }
};
async function _authenticate() {
	const savedAuth = XBLAuthentication.get();
	if (savedAuth.expiresOn &&
		savedAuth.expiresOn.length > 0 &&
		new Date(savedAuth.expiresOn) > new Date()
	) { return savedAuth; }
	else {
		const auth = await XboxLiveAuth.authenticate(process.env.XBL_EMAIL, process.env.XBL_PASSWORD);
		return XBLAuthentication.save(auth);
	}
}