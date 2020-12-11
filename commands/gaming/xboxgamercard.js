/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const XboxLiveAuth = require('@xboxreplay/xboxlive-auth');
const XBLAuthentication = require('../../helpers/XBLAuthentication');
const axios = require('axios');
const helpers = require('../../helpers/helpers');
const { createCanvas, Image, loadImage } = require('canvas');

module.exports = {
    name: 'xboxgamercard',
    category: 'gaming',
    aliases: ['xgamercard', 'gamercard'],
    description: 'Creates your very own xbox gamercard.',
    cooldown: 5,
    async execute(message, args) {

        let errMsg = '';
        let gamertag = args.join(' ');

        // mysql connection to get users gamertag stored in the database if they dont provide a gamertag.
        const connection = helpers.pool.getConnection();
        const result_user = await connection.query(`SELECT * FROM ${process.env.mysql_users_table} WHERE user_id = ${message.author.id}`);
        const result_gamertag = await connection.query(`SELECT * FROM ${process.env.mysql_xbox_table} WHERE user_id = ${result_user[0].id}`);

        if (!args[0]) {
            gamertag = result_gamertag && result_gamertag.length == 1 ? result_gamertag[0].gamertag : undefined;
            connection.release();
        }
        if (gamertag === undefined) {
            errMsg = 'You don\'t have your GT saved in the database. Do !setgt gamertag or !xgamercard gamertag';
            helpers.sendErr(message, errMsg);
            connection.release();
            return;
        }

        //pee pee poo poo

        const settings = ['GameDisplayPicRaw', 'Gamerscore', 'Gamertag'];
        const authInfo = await _authenticate();

        // Axios request to get the users profile details. Expected output: GameDisplayPicRaw, Gamerscore, Gamertag
        const profile = await axios({
            url: `https://profile.xboxlive.com/users/gt(${gamertag})/profile/settings`,
            params: { settings: settings.join(',') },
            headers: { 'x-xbl-contract-version': 2, 'content-type': 'application/json', Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}` },
        }).catch(err => {
            return console.log(`No user found for ${gamertag}`);
        });

        // Checks if gamertag provided actually exists
        if (profile == undefined) {
            errMsg = 'Error reading your profile this will most likely be due to your xbox account privacy settings or an invalid gamertag.';
            helpers.sendErr(message, errMsg);
            return;
        }

        const xuid = profile.data.profileUsers[0].id;

        // Axios request to get the users most recent games. Expected output: 5 recent games
        const titlehistory = await axios({
            url: `https://titlehub.xboxlive.com/users/xuid(${xuid})/titles/titlehistory/decoration/scid,image,detail`,
            params: { maxItems: 5 },
            headers: { 'x-xbl-contract-version': 2, Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}`, 'Content-Type': 'application/json', Accept: 'application/json', 'Accept-Language': 'en-US' },
        }).catch(err => {
            return console.log(`No recent games found for ${gamertag}`);
        });

        // Axios request to get the users xboxlive presence. Expected output: Online, Offline and Away
        const presence = await axios({
            url: `https://userpresence.xboxlive.com/users/xuid(${xuid})`,
            params: { level: 'all' },
            headers: { 'x-xbl-contract-version': 2, Authorization: `XBL3.0 x=${authInfo.userHash};${authInfo.XSTSToken}`, 'Content-Type': 'application/json', Accept: 'application/json', 'Accept-Language': 'en-US' },
        }).catch(err => {
            return console.log(`No presence data found for ${gamertag}`);
        });

        const recentgame = titlehistory.data.titles;
        const avatar = profile.data.profileUsers[0].settings[0].value;
        const displayGamertag = profile.data.profileUsers[0].settings[2].value;
        const gamerscore = profile.data.profileUsers[0].settings[1].value;

        // Checks if user has any recent games
        if (recentgame.length < 1) {
            errMsg = 'Error creating gamercard. This account has an incomplete profile.';
            helpers.sendErr(message, errMsg);
            return;
        }

        // Canvas size
        const width = 398;
        const height = 270;

        // Intiates the canvas for us to edit
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');

        // Different suffixes relate to the amount of stars on the gamercard. Random suffix is then chosen selecting a random PNG.
        const arr = ['0001', '0002', '0003', '0004', '0005'];
        const randomItem = arr[Math.floor(Math.random() * arr.length)];
        const background = await loadImage(`../../helpers/gamercards/oldxbox${randomItem}.png`);

        // Function that loads multiple images ready for canvas to draw
        function loadImages(sources, callback) {
            const images = {};
            let loadedImages = 0;
            let numImages = 0;
            // get num of sources
            for (const src in sources) {
                numImages++;
            }
            for (const src in sources) {
                images[src] = new Image();
                images[src].onload = function () {
                    if (++loadedImages >= numImages) {
                        callback(images);
                    }
                };
                images[src].src = sources[src];
            }
        }

        // Object of all the urls for each photo
        const sources = {
            avatar: avatar,
            first: recentgame[0].displayImage,
            second: recentgame[1].displayImage,
            third: recentgame[2].displayImage,
            fourth: recentgame[3].displayImage,
            fifth: recentgame[4].displayImage,
        };

        // Canvas creates the xbox gamercard 
        loadImages(sources, function (images) {
            
            // Images are processed onto the canvas
            context.drawImage(background, 0, 0, width, height);
            context.drawImage(images.avatar, 7 * 2, 23 * 2, 128, 128);
            context.drawImage(images.first, 7 * 2, 100 * 2, 64, 64);
            context.drawImage(images.second, 84 * 2, 100 * 2, 64, 64);
            context.drawImage(images.third, 46 * 2, 100 * 2, 64, 64);
            context.drawImage(images.fourth, 122 * 2, 100 * 2, 64, 64);
            context.drawImage(images.fifth, 161 * 2, 100 * 2, 64, 64);

            // Text is processed onto the canvas
            context.font = 'bold 20pt Corbel';
            context.textAlign = 'left';
            context.fillStyle = '#000000';
            context.fillText(displayGamertag, 7 * 2, 16 * 2);

            context.font = '20pt Arial';
            context.fillStyle = '#FFFFFF';
            context.textAlign = 'right';
            context.fillText(numberWithCommas(gamerscore), 377, 60 * 2);

            context.font = '20pt Corbel';
            context.fillStyle = '#FFFFFF';
            context.textAlign = 'right';
            context.fillText(presence.data.state, 377, 80 * 2);

            // Encodes the canvas as a PNG and attaches it to a discord message
            const attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), 'image.png');
            message.channel.send(attachment);
        });

        // Function to print an integer with commas as thousands separators 
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // Function to generate the tokens needed to access the official xbox api
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
    }
};