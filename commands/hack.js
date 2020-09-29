const Discord = require('discord.js');
const client = new Discord.Client();

//Fetch required for API Call
const fetch = require('node-fetch');

const helpers = require('../helpers/helpers');
module.exports = {
    name: 'hack',
    description: 'Become a professional hacker in one command! To run, try `!hack`',
    cooldown: 5,
    usage: ` `,
    async execute(message, args) {
        let option = args.slice(0).join(" ");
        //setTimeout(() => message.channel.send(`>>> Initiating hack...`).then(m => m.send(`K`)), 1000)

        message.channel.send('>>> Initiating hack...')
        .then((msg)=> {
          setTimeout(function(){
            msg.edit('>>> Hack complete!');
          }, 2000)
        }); 
        

        // message.channel.send(`>>> Initiating hack...`).then(m => m.delete({timeout: 1000}));
        // message.channel.send(`>>> Locating target...`).then(m => m.delete({timeout: 1000}));
        // message.channel.send(`>>> Target found...`).then(m => m.delete({timeout: 1000}));
        // message.channel.send(`>>> Hacking..`).then(m => m.delete({timeout: 1000}));
        // message.channel.send(`>>> Returning results...`).then(m => m.delete({timeout: 1000}));
        // message.channel.send(`>>> Hack complete...`).then(m => m.delete({timeout: 1500}));

        fetch(`https://randomuser.me/api/`)
        .then(response => response.json())
        .then(data => {             
                let embed = new Discord.MessageEmbed()
                .setColor("#ff00ff")
                .setTitle(`Super Legitimate Hacking Information`)
                .addField(`Personal Info`,`Name: ${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last} \n Address: ${data.results[0].location.street.number} ${data.results[0].location.street.name} \n ${data.results[0].location.city} ${data.results[0].location.state} \n${data.results[0].location.country} \n Postal Code ${data.results[0].location.postcode} \n Date of Birth: ${data.results[0].dob.date.slice(0,-14)} Age: ${data.results[0].dob.age}`)
                .addField(`Pwned Credentials`, `Username: ${data.results[0].login.username} \nPassword: ${data.results[0].login.password}\n Phone Number: ${data.results[0].phone}`)
                .setFooter(helpers.getFooter());
                message.channel.send(embed);
        }
        );
        delete embed;
        return;
  
    }
}