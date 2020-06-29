# Game Info Bot
A Discord bot that returns helpful information of video games, including general information, completion time, and review scores.
## Installation
Create a copy of `.env-sample` and name it `.env`, then add the required tokens. This file won't be commited.

The following packages and dependencies are used in this project: 
```bash
npm install discord.js
npm install dotenv
npm install find config
npm install howlongtobeat
npm install igdb-api-node
npm install node-fetch
npm install request
```

To install all required dependencies, run 
```bash
npm install
```
You'll also need a Discord API and IGDB API key if you are planning on hosting this yourself.
## Usage
Invite the bot to your server using this link: https://discord.com/oauth2/authorize?client_id=725749175282696194&scope=bot&permissions=8 

To run the bot, run ```node ./index.js```. Once the bot says ```Ready to go!```, you can begin issuing command to the bot in your server.

## Commands
Game Info Bot uses the following commands:

`about` Get info about the bot

`gameinfo`  Get general information of a particular game

`gametime`  Get the time to complete a game's campaign and DLC 

`help` The bot will DM you of info of all commands


## Support
If you are stuck using this bot, you can go to discord.teamrespawntv.com and ask for help.

## Contributors
Main contributors to Game Info Bot:

* https://github.com/AndyTheNerd 
* https://github.com/Patross 
* https://github.com/NicmeisteR 

Game Info Bot is open source, so feel free to contribute to it to make it better!