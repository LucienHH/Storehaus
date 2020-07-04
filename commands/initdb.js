var mysql = require('mysql');
const helpers = require('../helpers/helpers');
module.exports = {
    name: '',
    description: 'Initiate DB (BOT OWNER ONLY)',
    cooldown: 5,
    async execute(message, args) {

        var con  = helpers.connectMYSQL();

        con.query(`CREATE TABLE IF NOT EXISTS bug_reports(  
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,  
            user_name varchar(45) NOT NULL,  
            user_id varchar(35) NOT NULL,
            report varchar(2048) NOT NULL,
    		status varchar (10) not null,
    		contact_permission varchar(10) not null,
    		made_at datetime not null DEFAULT CURRENT_TIMESTAMP
            );`), function(err,results){
                con.end();
            }
        }
    }