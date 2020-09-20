const Discord = require('discord.js');
const client = new Discord.Client();

const fetch = require('node-fetch');

module.exports = {
    name: 'chuck',
    description: 'Of course we need Chuck Norris jokes. To run, type `!chuck`',
    cooldown: 5,
    async execute(message, args) {
      fetch(`https://api.chucknorris.io/jokes/random`)
      .then(response => response.json())
      .then(data => {             
              var quote = data.value
              var url = data.url
              message.channel.send(`>>> ${quote}`);
      }
      );
      delete embed;

      return;
  }
}