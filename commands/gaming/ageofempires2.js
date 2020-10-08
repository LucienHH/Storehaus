//WIP

require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');
const helpers = require('../../helpers/helpers');
module.exports = {
    name: 'age2',
    category: 'gaming',
    aliases: [`age`, `age of empires`, `age 2`],
    description: 'Retrieve info about everything Age of Empires 2! To run, try `!age2`. To see all commands in Age 2, try `!age2 all`',
    cooldown: 5,
    usage: " list: `!age2 civs` or `!age2 japanese` or `!age2 all`",
    async execute(message, args) {
        let input = args.slice(0).join(" ");
        const option = input.toLowerCase(); 

        if (option == undefined || option=="" || option == "all") {
            let embed = new Discord.MessageEmbed()
            .setColor("#ff00ff")
            .setTitle(`Age of Empires 2 Commands`)
            .addField(`Civs`, "See all the information about every civ in Age of Empires 2. Can also be used for an individual civ\n`!age2 all civs` or `!age2 japenese`")
            .addField(`Units`, "See all the information about every unit in Age of Empires 2. Can also be used for an individual unit. \n`!age2 all units` or `!age2 villager`")
            .addField(`Structures`, "See all the information about every building in Age of Empires 2. Can also be used for an individual building. \n`!age2 all structures` or `!age2 castle`")
            .addField('Random', "Have Storehaus randomly pick a unit or structure and provide more information on.\n`!age2 random`")
            .setFooter(`<3`)
            message.channel.send(embed);
            delete embed;
            return;
        }
        if (option == "all civs" || option == "civs")
        {        
        fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations`)
        .then(response => response.json())
        .then(data => {             
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`All Civilization Info`);

                data.civilizations.map(d =>{
                    embed.addField(`${d.name}`, `Expansion Pack: ${d.expansion}`,true)
                })
                message.channel.send(embed);
            }
            );
        delete embed;

        return;
        }
        //End if
        if (option == "aztecs" || option == "britons" || option == "byzantines"  ||option == "celts" ||option == "chinese" ||option == "goths" ||option == "huns" ||option == "japanese" ||option == "koreans" ||option == "mayans" ||option == "mongols" ||option == "persians" ||option == "saracens" ||option == "spanish" ||option == "teutons" ||option == "turks" ||option == "vikings")
        {
            fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${option}`)
            .then(response => response.json())
            .then(data => {             
                    let embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .setTitle(`Age of Empires 2 All Civilization Info`);
                    embed.addField(`${data.name}`, `Expansion Pack: ${data.expansion}\n Army Type: ${data.army_type}\n Team Bonus: ${data.team_bonus}`)
                    message.channel.send(embed);
                }
                );
            delete embed;
    
            return;
        }
        if (option == "all units" || option == "units")
        {        
        fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/units`)
        .then(response => response.json())
        .then(data => {             
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Age of Empires 2 All Units Info`);
                embed.setFooter('To get more info about a particular unit, try !age2 [unit name]');
                data.units.map(d =>{
                    embed.addField(`${d.name}`, `Expansion: ${d.expansion}\n Age: ${d.age}\n`,true)
                })
                
                message.channel.send(embed);
            }
            );
        delete embed;

        return;
        }
        if (option == "all structures" || option == "structures" || option == "all buildings" || option == "buildings")
        {        
        fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/structures`)
        .then(response => response.json())
        .then(data => {             
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Age of Empires 2 All Units Info`);
                embed.setFooter('To get more info about a particular unit, try !age2 [unit name]');
                data.structures.map(d =>{
                    embed.addField(`${d.name}`, `Build Time: ${d.build_time}\n Age: ${d.age}\nHit Points: ${d.hit_points}`,true)
                })
                
                message.channel.send(embed);
            }
            );
        delete embed;

        return;
        }

        //NOTE: This is ugly. Yes, I know.
        if (option == "archer" || option == "crossbowman" || option == "arbalest" || option == "cavalry archer" || option == "heavy cavalry archer" || option == "hand cannoneer" || option == "skirmisher" || option == "elite skirmisher" || option == "eagle warrior" || option == "eagle warrior" || option == "elite eagle warrior" || option == "spearman" || option == "pikeman" || option == "halberdier" || option == "militia" || option == "man-at-arms" || option == "long swordsman" || option == "two-handed swordsman" || option == "champion" || option == "king" || option == "petard" || option == "trebuchet" || option == "cannon galleon" || option == "elite cannon galleon" || option == "demolition ship" || option == "heavy demolition ship" || option == "fire ship" || option == "fast fire ship" || option == "galley" || option == "war galley" || option == "galleon" || option == "longboat" || option == "elite longboat" || option == "fishing ship" || option == "trade cog" || option == "transport ship" || option == "turtle ship" || option == "elite turtle ship" || option == "wild boar" || option == "deer" || option == "horse" || option == "sheep" || option == "turkey" || option == "wolf" || option == "jaguar" || option == "trade cart" || option == "missionary" || option == "monk" || option == "bombard cannon" || option == "mangonel" || option == "onager" || option == "siege onager" || option == "battering ram" || option == "capped ram" || option == "siege ram" || option == "scorpion" || option == "heavy scorpion" || option == "camel" || option == "heavy camel" || option == "knight" || option == "cavalier" || option == "paladin" || option == "scout cavalry" || option == "scout cavalry" || option == "light cavalry" || option == "hussar" || option == "villager" || option == "berserk" || option == "elite berserk" || option == "cataphract" || option == "elite cataphract" || option == "chu ko nu" || option == "elite chu ko nu" || option == "conquistador" || option == "elite conquistador" || option == "huskarl" || option == "elite huskarl" || option == "jaguar warrior" || option == "elite jaguar warrior" || option == "janissary" || option == "elite janissary" || option == "longbowman" || option == "elite longbowman" || option == "mameluke" || option == "elite mameluke" || option == "mangudai" || option == "elite mangudai" || option == "plumed archer" || option == "elite plumed archer" || option == "samurai" || option == "elite samurai" || option == "tarkan" || option == "elite tarkan" || option == "teutonic knight" || option == "elite teutonic knight" || option == "throwing axeman" || option == "elite throwing axeman" || option == "war elephant" || option == "elite war elephant" || option == "war wagon" || option == "elite war wagon" || option == "woad raider" || option == "elite woad raider" )
        {        
        fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/unit/${option}`)
        .then(response => response.json())
        .then(d => {             
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Age of Empires 2 Unit Info`);
                embed.setFooter(helpers.getFooter());
                var food = d.cost.Food
                var gold = d.cost.Gold
                var stone = d.cost.Stone
                var wood = d.cost.Wood
                if (food == undefined)
                {
                    food = 0;
                }
                if (gold == undefined)
                {
                    gold = 0;
                }
                if (stone == undefined)
                {
                    stone = 0;
                }
                if (wood == undefined)
                {
                    wood = 0;
                }
                embed.addField(`${d.name}`, `Description: ${d.description}\nExpansion: ${d.expansion}\nAge: ${d.age}\nBuild Time: ${d.build_time} seconds\nCost: ${wood} wood, ${gold} gold, ${food} food, ${stone} stone\nMovement Rate: ${d.movement_rate}\nHit Points: ${d.hit_points}\nArmor: ${d.armor}\nAttack: ${d.attack}`,true)
   
                
                message.channel.send(embed);   
            });
            delete embed;
            return; 
        }
        //NOTE: This is ugly. Yes, I know.
        if (option == "barracks" || option == "dock" || option == "farm" || option == "fish trap" || option == "house" || option == "lumber camp" || option == "mill" || option == "mining camp" || option == "town center" || option == "archery range" || option == "barracks" || option == "blacksmith" || option == "dock" || option == "house" || option == "lumber camp" || option == "market" || option == "mill" || option == "mining camp" || option == "stable" || option == "town center" || option == "archery range" || option == "barracks" || option == "blacksmith" || option == "castle" || option == "dock" || option == "house" || option == "lumber camp" || option == "market" || option == "mill" || option == "mining camp" || option == "monastery" || option == "siege workshop" || option == "stable" || option == "town center" || option == "university" || option == "archery range" || option == "barracks" || option == "blacksmith" || option == "dock" || option == "house" || option == "lumber camp" || option == "market" || option == "mill" || option == "mining camp" || option == "monastery" || option == "siege workshop" || option == "stable" || option == "town center" || option == "university" || option == "wonder" || option == "outpost" || option == "palisade wall" || option == "gate" || option == "stone wall" || option == "watch tower" || option == "fortified wall" || option == "guard tower" || option == "bombard tower" || option == "keep")
        {        
        fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/structure/${option}`)
        .then(response => response.json())
        .then(d => {             
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Age of Empires 2 Structure Info`);
                embed.setFooter(helpers.getFooter());
                var gold = d.cost.Gold
                var stone = d.cost.Stone
                var wood = d.cost.Wood
                if (gold == undefined)
                {
                    gold = 0;
                }
                if (stone == undefined)
                {
                    stone = 0;
                }
                if (wood == undefined)
                {
                    wood = 0;
                }
                embed.addField(`${d.name}`, `\nExpansion: ${d.expansion}\nAge: ${d.age}\nBuild Time: ${d.build_time} seconds\nCost: ${wood} wood, ${gold} gold, ${stone} stone\nHit Points: ${d.hit_points}\nLine of Sight: ${d.line_of_sight}`,true)
   
                
                message.channel.send(embed);   
            });
            delete embed;
            return; 
        }
        if (option == "random")
        {
            //randomly determine if this will pick between a unit or building
            var random =  Math.floor((Math.random() * 100) + 1); 
            //building
            if (random > 50)
            {
                //Generate random number based on IDs of buildings (https://github.com/aalises/age-of-empires-II-api/blob/master/data/structures.csv)
                var randomBuilding = Math.floor((Math.random() * 50) + 1); 
                console.log(randomBuilding)
                fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/structure/${randomBuilding}`)
                .then(response => response.json())
                .then(d => {             
                    let embed = new Discord.MessageEmbed()
                    .setColor("#ff00ff")
                    .setTitle(`Age of Empires 2 Structure Info`);
                    embed.setFooter(helpers.getFooter());
                    var gold = d.cost.Gold
                    var stone = d.cost.Stone
                    var wood = d.cost.Wood
                    if (gold == undefined)
                    {
                        gold = 0;
                    }
                    if (stone == undefined)
                    {
                        stone = 0;
                    }
                    if (wood == undefined)
                    {
                        wood = 0;
                    }
                    embed.addField(`${d.name}`, `\nExpansion: ${d.expansion}\nAge: ${d.age}\nBuild Time: ${d.build_time} seconds\nCost: ${wood} wood, ${gold} gold, ${stone} stone\nHit Points: ${d.hit_points}\nLine of Sight: ${d.line_of_sight}`,true)
    
                    
                    message.channel.send(embed);   
                });
                delete embed;
                return; 
            }
            else
            {
                //Generate random number based on IDs of units (https://github.com/aalises/age-of-empires-II-api/blob/master/data/units.csv)
                var randomUnit = Math.floor((Math.random() * 105) + 1); 
                fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/unit/${randomUnit}`)
                .then(response => response.json())
                .then(d => {             
                        let embed = new Discord.MessageEmbed()
                        .setColor("#ff00ff")
                        .setTitle(`Age of Empires 2 Unit Info`);
                        embed.setFooter(helpers.getFooter());
                        var food = d.cost.Food
                        var gold = d.cost.Gold
                        var stone = d.cost.Stone
                        var wood = d.cost.Wood
                        if (food == undefined)
                        {
                            food = 0;
                        }
                        if (gold == undefined)
                        {
                            gold = 0;
                        }
                        if (stone == undefined)
                        {
                            stone = 0;
                        }
                        if (wood == undefined)
                        {
                            wood = 0;
                        }
                        embed.addField(`${d.name}`, `Description: ${d.description}\nExpansion: ${d.expansion}\nAge: ${d.age}\nBuild Time: ${d.build_time} seconds\nCost: ${wood} wood, ${gold} gold, ${food} food, ${stone} stone\nMovement Rate: ${d.movement_rate}\nHit Points: ${d.hit_points}\nArmor: ${d.armor}\nAttack: ${d.attack}`,true)
           
                        
                        message.channel.send(embed);   
                    });
                    delete embed;
                    return; 
            }
        }

    }
}