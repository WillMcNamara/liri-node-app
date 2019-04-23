//allows code to read and set any environment variable
require("dotenv").config();

//imports keys.js and stores it in variable
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//accessing keys from keys.js and .env
var bandsInTown = keys.bandsInTown.key;
var OMDB = keys.OMDB.key;
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})

//taking search input
var input = "";
for (i = 3; i < process.argv.length; i++){
    input += process.argv[i];
    if (i !== process.argv.length - 1){
    input += " ";
    }
}

function concertThis(input){
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsInTown.key;
    axios.get(queryUrl).then(function(res){
        console.log(res.data[1].venue.name);
        console.log(res.data[1].venue.city + ", " + res.data[1].venue.country);
        console.log(res.data[1].datetime);
    })
}

function spotifyThis(input){
    spotify.search({type: "track", query: input, limit: 1})
        .then(function(response) {
            var data = response.tracks.items[0];
            console.log("Artist: " + data.artists[0].name);
            console.log("Song name: " + data.name);
            console.log("Preview link : " + data.preview_url);
            console.log("Album: " + data.album.name);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function movieThis(input){
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

function checkTerm(search, input){
    //concert search option
    if (search === "concert-this") {
        concertThis(input);
    }

    //spotify search option
    if (search === "spotify-this-song") {
        spotifyThis(input);
    }

    //movie search option
    if (search === "movie-this") {
        movieThis(input);
    }
    //other thing
    if (search === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(err, data){
            if (err) {
                return console.log(err);
            }
            data = data.split(",");
            checkTerm(data[0], data[1]);
        })
    }
}

checkTerm(process.argv[2], input);





