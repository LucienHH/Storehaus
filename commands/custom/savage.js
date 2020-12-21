const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'savage',
    category: 'custom',
    aliases: [],
    description: 'A savage command',
    cooldown: 1,
    usage: ` `,
    execute(message, args) {
        message.channel.send(`There's a lot of people on Earth, lots of them do great things. Many don't. You're among the group that will never and have never accomplished anything. The only thing you have true control over is the things you post online, I sincerely hope that you find some solace in leaving comments like this; because if I was in your position I'd find it really difficult not to succumb to the overwhelming urge to end my own life. If there is anyone in your life that has told you you're shit, they were correct.`);
    },
};