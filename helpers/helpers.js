module.exports = {

    replaceAllSpecialChars: function(string){
    
        // return string.replace(pattern, replaceWith);

        var converted = string;
        
        converted = converted.replace(/&quot;/g, "\"");
        converted = converted.replace(/&#039;/g, "\'");
        converted = converted.replace(/&#039;/g, "é")

        return converted;

    }

};