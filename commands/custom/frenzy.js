const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'frenzy',
    category: 'custom',
    aliases: [],
    description: 'Custom command for Frenzy.',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        let array = [`K that's it you're going to bed`, `Probably not a 50 yet`, `Your local neighbourhood invasion sweat`, `Getting sweaty with spaghetti`, `Oh absolutely`, `Type !xyro its funny`, `Hmmmmmmmm`,`"I want you Andrew"- Frenzy, 2020`, `K you're getting banned`, `@Frenzy  No u`, `@Convicted Kevin  Heretic`]
        const random = Math.floor(Math.random() * array.length);
        message.channel.send(array[random]);
    },
};