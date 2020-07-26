
const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
const fetch = require('node-fetch');
// const { require } = require('find-config');
let helpers = require("../helpers/helpers")

module.exports = {
    name: 'leagueLink',
    description: 'Link a league of legends account to your Discord account',
    cooldown: 5,
    async execute(message, args) {
        
    }
}