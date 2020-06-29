require('dotenv').config({ path: require('find-config')('.env') });
const Discord = require('discord.js');
const client_discord_embed = new Discord.MessageEmbed();
var request = require("request");

module.exports.get = async (url, query, message, args) =>{
    let fields;

    if(query === "game"){
        //Taking in argument of game name
        let game = args.slice(0).join(" ");
                
        //API Fields
        fields = `age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,
        created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,
        name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,
        summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;
          limit 5; search "${game}"`

    }
    else {
        // This is to get cover art, 69359 being the ID of the game thats picture you want.
        fields = 'alpha_channel,animated,checksum,game,height,image_id,url,width; where game = 69359'
    }
    
	var options = {
        method: 'GET',
        url: url,
        qs: {
            fields: fields
        },
        headers: {'user-key': process.env.igdb_token, accept: 'application/json'},
        jar: 'JAR'
	};
	
	request (options, function (error, response, body) {
 
        if (error) throw new Error(error);
        body = JSON.parse(body);

        let title = new Discord.MessageEmbed()
        title.setTitle("Search Results");
        title.setColor("#ff00ff");
        for (let i = 0; i < body.length; i++) {   
            titleno = i + 1;     
            title.addField(`\u200b` ,`**${titleno}** - *${body[i].name}*`);
            
            
        }
        title.addField('\u200b',`*PLEASE CHOOSE A NUMBER FROM 1-${body.length}*`);
        // title.setFooter(`*PLEASE CHOOSE A NUMBER FROM 1-${body.length}*`)
        message.channel.send(title);
        delete title;
        
        
        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collectedMessage => {
            let parsedInt = parseInt(collectedMessage.first().content);
            if(isNaN(parsedInt) || (parsedInt <1 || parsedInt > body.length) ){
                message.channel.send(`You need to provide a number between 1 and ${body.length}`)
            }else{

                var num = parsedInt -1;
            for (let i = 0; i < 1; i++) {
                console.log("len is "+ body.length)
                console.log(body[num].summary.length);
                var summary = body[num].summary
                var array = summary.split("");
        
                let game_summary = "";
                loop1:
                for (let i = 0; i < array.length; i++) {
                    game_summary += summary[i];
                    if (i == 509) {
                        game_summary += '...';
                        break loop1;
                    }
        
                }
                //Stores release date of game. Is returned as epoch time
                var releaseDate = new Date(body[num].first_release_date *1000);

                let info = new Discord.MessageEmbed()
                .setTitle("Game Information")
                .setColor("#008b8b")
                // .setThumbnail(body[0].cover)
                .addField("Title ", body[num].name)
                .addField("Description ", game_summary)
                .addField("Link ", body[num].url)
                .addField("Release Date ", releaseDate.toGMTString())
                // .setImage(body[0].url)
                .setTimestamp();
            
                message.channel.send(info);
            }
        }

        }).catch(error =>{
            console.log(error)
        })
        // for (let i = 0; i < body.length; i++) {
        //     console.log("len is "+ body.length)
        //         console.log(body[i].summary.length);
        //         var summary = body[i].summary
        //         var array = summary.split("");
        
        //         let game_summary = "";
        //         loop1:
        //         for (let i = 0; i < array.length; i++) {
        //             game_summary += summary[i];
        //             if (i == 509) {
        //                 game_summary += '...';
        //                 break loop1;
        //             }
        
        //         }
        //         //Stores release date of game. Is returned as epoch time
        //         var releaseDate = new Date(body[i].first_release_date *1000);

        //         let info = new Discord.MessageEmbed()
        //         .setTitle("Game Information")
        //         .setColor("#008b8b")
        //         // .setThumbnail(body[0].cover)
        //         .addField("Title ", body[i].name)
        //         .addField("Description ", game_summary)
        //         .addField("Link ", body[i].url)
        //         .addField("Release Date ", releaseDate.toGMTString())
        //         // .setImage(body[0].url)
        //         .setTimestamp();
            
        //         message.channel.send(info);
        // }

        // delete info;
	});
}