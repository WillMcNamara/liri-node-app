//allows code to read and set any environment variable
require("dotenv").config();
//imports keys.js and stores it in variable
var keys = require("./keys.js");

var axios = require("axios");

//accessing keys from keys.js and .env
var bandsInTown = keys.bandsInTown.key;
var OMDB = keys.OMDB.key;
var spotifyID = keys.spotify.id;
var spotifySecret = keys.spotify.secret;

//taking search input
var input = "";
for (i = 3; i < process.argv.length; i++){
    input += process.argv[i];
    if (i !== process.argv.length - 1){
    input += "%20";
    }
    console.log(input);
}

//concert search option
if (process.argv[2] === "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsInTown.key;
    axios.get(queryUrl).then(function(res){
        console.log(res.data[1].venue.name);
        console.log(res.data[1].venue.city + ", " + res.data[1].venue.country);
        console.log(res.data[1].datetime);
    })
}

//spotify search option
if (process.argv[2] === "spotify-this-song") {
}

//movie search option
if (process.argv[2] === "movie-this") {
    var queryUrl = "https://www.omdbapi.com/?t=" + input + "&apikey=" + OMDB;
    axios.get(queryUrl).then(function(res){
        console.log("Title: " + res.data.Title);
        console.log("Year: " + res.data.Year);
        console.log("IMDB: " + res.data.imdbRating);
        console.log("Metascore: " + res.data.Metascore);
        console.log("Country: " + res.data.Country);
        console.log("Language: " + res.data.Language);
        console.log("Plot: " + res.data.Plot);
        console.log("Actors: " + res.data.Actors);
    })
}

//other thing
if (process.argv[2] === "do-what-it-says") {
}





