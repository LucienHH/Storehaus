const Discord = require('discord.js');
const helpers = require('../../helpers/helpers');
const client = new Discord.Client();
module.exports = {
    name: 'remind',
    category: 'utility',
    aliases: ['reminder'],
    description: 'Use storehaus to set periodic reminders to your server!',
    usage: `!remind`,
    cooldown: 10,
    execute(message, args) {
        ///
        ///FUNCTIONS
        ///
        function setup() {

        }
        function edit() {

        }
        function remove() {

        }
        function view() {

        }
        function invalid() {

        }

        ///
        ///END OF FUNCTIONS
        ///
        switch (args[0].toLowerCase()) {
            case "setup":
                setup();
                break;
            case "edit":
                edit();
                break;
            case "delete":
                remove();
                break;
            case "view":
                view();
                break;
            default:
                invalid();
                break;
        }
    }
};