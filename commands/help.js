require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
//required
const prefix = process.env.prefix;
const helpers = require('../helpers/helpers');
module.exports = {
    name: 'help',
    aliases: [],
    description: 'List info about a specific command.',
    cooldown: 2,
    usage: '[command name]',
    execute(message, args, client) {
        const data = [];
        const { commands } = message.client;
        //// ----------Leaving this commented out in case we use it in the future---------------////
        // if (!args.length) {
        //     // Sends a DM to author of all commands
        //     data.push('Here\'s a list of all my commands:');
        //     commands.map(command => {
        //         if(command.name.charAt(0)!='_'){
        //             data.push(command.name)
        //         }
        //     });
        //     data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
        //     return message.author.send(data, { split: true })
        //         .then(() => {
        //             if (message.channel.type === 'dm') return;
        //             message.reply('I\'ve sent you a DM with all my commands!');
        //         })
        //         .catch(error => {
        //             console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        //             message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
        //         });
        // //------------------------------------------------------------------------------//
        let name = args.slice(0).join(" ");

        if (name == undefined || name == "") {
            //message.channel.send(new Discord.MessageEmbed().setTitle("Try !help `name of a command`. To view all commands, type `!about`"));
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle("Storehaus Commands List")
            .addField("🎮 Gaming Commands", "To see more detailed info, run `!help gaming`\n----------------\n`!achievements`\n `!age2`\n`!compat`\n`!dlc`\n`!gameinfo`\n`!gamesub`\n`!gogdeals`\n`!goty`\n`!halopedia`\n`!haloquote`\n`!playanywhere`\n`!playtime`\n`!psnow`\n`!review`\n`!screenshot`\n`!series`\n`!steamdeals`\n`!stores`\n`!xbl`\n`!xachievement`\n`!xavatar`\n`!xboxgc`\n`!xboxss`",true)
            .addField("😂 Humor Commands", "To see more detailed info, run `!help humor`\n----------------\n`!8ball`\n`!anime`\n`!cat`\n`!chuck`\n`!dadjoke`\n`!dog`\n`!exchangerates`\n`!geekjoke`\n`!gif`\n`!hack`\n`!insult`\n`!ligma`\n`!mars`\n`!math`\n`!meme`\n`!nasa`\n`!random`\n `!someone`\n`!starwars`\n`!today`\n`!weather`\n`!xbl`\n`!yell`\n`!yesorno`",true)
            .addField("⚙️ Misc Commands", "To see more detailed info, run `!help misc`\n----------------\n`!about`\n`!feedback`\n`!help`\n`!invite`\n`!support`\n`!teamrespawn`",true)
            embed.setFooter(helpers.getFooter());
            message.channel.send(embed);
            delete embed;
            return;
        }
        else if (name == "gaming" || name == "Gaming") {
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle(`Gaming Commands`)
            .addField(`Achievements`, "Learn about the achievements of a particular game\n`!achievements skyrim`")
            .addField(`Age of Empires 2`, "Get a bunch of cool info about Age of Empires 2!\n `!age2`")
            .addField(`Compat`,"See if a game is backwards compatatible on Xbox One\n `!compat Halo 4`")
            .addField(`DLC`, "See what DLC is offered on a game\n `!dlc witcher 3`")
            .addField(`Game Info`, "Get general information of a particular game.\n `!gameinfo Crackdown 2`")
            .addField(`Game Sub`, "See the recent posts of a game's subreddit.\n `!gamesub minecraft`")
            .addField(`GOG Deals`, "Check if a game is on sale on GoG\n `!gogdeals witcher 3`")
            .addField(`Game of the Year`, "See what the best games are for a particular year\n `!goty 2018`")
            .addField(`Halopedia`, "Search for an article from the Halo lore website Halopedia.org\n `!halopedia Reach` or `!halopedia random`")
            .addField(`Halo Quotes`, "Send a line of dialogue from the Halo series! Quotes are picked at random.\n `!haloquote`")
            .addField(`Play Anywhere`, "See if a Xbox game is part of the Play Anywhere program.\n `!playanywhere Halo Wars 2`")
            .addField(`Playtime`, "Get the time to complete a game's campaign and DLC.\n `!playtime skyrim`")
            .addField(`PS Now`, "See if a game is on Playstation Now.\n `!psnow uncharted 2`")
            .addField(`Review`, "Read a review and score of a game.\n `!review overwatch`")
            .addField(`Screenshot`, "See a cool screenshot of a game.\n `!screenshot minecraft`")
            .addField(`Series`, "Find out what the other games in a series are.\n `!series Halo`")
            .addField(`Steam Deals`, "Check if a game is on sale on Steam.\n `!steamdeals cities skylines`")
            .addField(`Stores`, "See which stores are selling a game.\n `!stores Far Cry 4`")
            .setFooter(`<3`)
            message.channel.send(embed);
            delete embed;
            return;
        }
        else if (name == "humor" || name == "Humor") {
            let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Humor Commands`)
                .addField(`8ball`, "Ask the bot for advice. May or may not be a good idea.\n`!8ball Should I fire James?`")
                .addField(`Anime`, "Get an anime quote!\n `!anime random` or `!anime naruto`")
                .addField(`Cat`, "Retrieve a random picture of a cute kitty.\n `!cat`")
                .addField(`Chuck`, "What bot would not have Chuck Norris jokes?\n `!chuck`")
                .addField(`Dad Jokes`, "Dad joke lol.\n `!dadjoke`")
                .addField(`Dog`, "Retrieve a random picture of a good doggo.\n `!dog`")
                .addField(`Exchange Rates`, "Retrieve the current exchange rates for various currencies.\n `!exchangerates usd`")
                .addField(`Geek Joke`, "If you laugh you are a true nerd\n `!geekjoke`")
                .addField(`Gif`, "Retrieve a random gif.\n `!gif`")
                .addField(`Hack`, "Be a true hacker and hack a totally fake person.\n `!hack`")
                .addField(`Insult`, "Get a random insult. May or may not make sense for the lolz.\n `!insult @james`")
                .addField(`Ligma`, "Do you have ligma? What about one of your friends?\n `!ligma @someone` or `!ligma`")
                .addField(`Mars`, "See a random picture taken by the NASA Curiosity rover!\n `!mars`")
                .addField(`Math`, "Retrieve a random fact about math, numbers, and dates in history.\n `!math`")
                .addField(`Meme`, "See some of the best gaming memes on the Internet today. Recommended for those 18+.\n `!meme`")
                .addField(`Nasa`, "See the NASA Picture of the Day! One of our favorite commands.\n `!nasa`")
                .addField(`Star Wars`, "Grab a random quote from the Star Wars movies. Of course the prequels are included.\n `!starwars`")
                .addField(`Today in History`, "Learn about what happened today in history.\n `!today`")
                .addField(`Trivia`, "Learn something new about gaming, TV, film, and history.\n `!trivia game`, `!trivia film`, `!trivia tv`, or `!trivia history`")
                .addField(`Weather`, "Get data of weather from any city around the world.\n `!weather Tokyo`")
                .addField(`No Context Xbox Live Messages`, "See a random post from the No Context Xbox Live subreddit.\n `!xbl`")
                .addField(`Yes Or No`, "Yes or No.\n `!yesorno`")
                .setFooter(`<3`)
            message.channel.send(embed);
            delete embed;
            return;
        }
        else if (name == "misc" || name == "Misc") {
            let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Misc Commands`)
                .addField(`About`, "Get info about Storehaus\n`!about`")
                .addField(`Feedback`, "Send feedback to make the bot better!\n`!feedback the nasa command is broken`")
                .addField(`Help`, "You're using this command right now.\n`!help`")
                .addField(`Invite`, "Invite Storehaus to your server.\n`!invite`")
                .addField(`Support`, "Get a link to join the Storehaus support server\n`!support`")
                .addField(`TeamRespawn`, "Get info and links to the YouTube channel and community that developed this bot!\n `!tr`")
                .setFooter(`<3`)
            message.channel.send(embed);
            delete embed;
            return;
        }
        else {
            const command = args[0];
            if (client.commands.has(command)) { //  CClient is undefined 
                cmd = client.commands.get(command);
                const embed = new Discord.MessageEmbed().setColor('00FF00');
                cmd.name ? embed.setTitle(`Help for **\`${cmd.name}\`**`) : null;
                cmd.aliases.length > 0 ? embed.addField('Aliases', `${cmd.aliases.join(', ')}`) : null;
                cmd.description ? embed.addField('Description', `${cmd.description}`) : null;
                cmd.usage ? embed.addField('Usage', `${prefix}${cmd.name} ${cmd.usage}`) : null;
                cmd.cooldown ? embed.addField('Cooldown', `${cmd.cooldown} seconds`) : null;

                message.channel.send(embed);
                return;
            }
            else if (client.aliases.has(command)) {
                cmd = client.commands.get(client.aliases.get(command));
                const embed = new Discord.MessageEmbed().setColor('00FF00');
                cmd.name ? embed.setTitle(`Help for **\`${cmd.name}\`**`) : null;
                cmd.aliases.length > 0 ? embed.addField('Aliases', `${cmd.aliases.join(', ')}`) : null;
                cmd.description ? embed.addField('Description', `${cmd.description}`) : null;
                cmd.usage ? embed.addField('Usage', `${prefix}${cmd.name} ${cmd.usage}`) : null;
                cmd.cooldown ? embed.addField('Cooldown', `${cmd.cooldown} seconds`) : null;

                message.channel.send(embed);
                return;
            }
            else {
                return message.reply('That command doesn\'t exist!');
            }
        }
    }
};