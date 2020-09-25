//Sanity check test


function anime(quote, character, anime) {
    // return a + b;
    const fetch = require('node-fetch');
    fetch(`https://animechanapi.xyz/api/quotes/random`)
            .then(response => response.json())
            .then(data => {
                    var quote1 = data.data[0].quote;
                    var character1 = data.data[0].character;
                    var anime1 = data.data[0].anime; 
                    quote = quote1;
                    character = character1;
                    anime = anime;
            })
  }
  module.exports = sum;
  