var mysql = require('mysql');
require('dotenv').config({ path: require('find-config')('.env') });
module.exports = {

    replaceAllSpecialChars: function(string){
    
        // return string.replace(pattern, replaceWith);

        var converted = string;
        
        converted = converted.replace(/&quot;/g, "\"");
        converted = converted.replace(/&#039;/g, "\'");
        converted = converted.replace(/&#039;/g, "é")

        return converted;

    },

    connectMYSQL: function(){
            var con = mysql.createPool({
            connectionLimit : 100,
            host: `${process.env.mysql_host}`,
            database: `${process.env.mysql_database}`,
            user: `${process.env.mysql_user}`,
            password: ""
          });

          return con;
    }

};