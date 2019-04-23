//allows code to read and set any environment variable
require("dotenv").config();
//imports keys.js and stores it in variable
var keys = require("./keys.js");
//keys can be accessed like: var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var bandsInTown = keys.bandsInTown.key
console.log(bandsInTown);

var input = "";
for (i = 3; i < process.argv.length; i++){
    input += process.argv[i];
    if (i !== process.argv.length - 1){
    input += "%20";
    }
    console.log(input);
}


if (process.argv[2] === "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsInTown.key;
    axios.get(queryUrl).then(function(res){
        console.log(res.data[1].venue.name);
        console.log(res.data[1].venue.city + ", " + res.data[1].venue.country);
        console.log(res.data[1].datetime);
    })
}

if (process.argv[2] === "spotify-this-song") {
}

if (process.argv[2] === "movie-this") {
}

if (process.argv[2] === "do-what-it-says") {
}





