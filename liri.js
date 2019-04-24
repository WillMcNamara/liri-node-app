//allows code to read and set any environment variable
require("dotenv").config();

//imports keys.js and stores it in variable
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

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

var divider = "\n------------------------------------------------------------\n\n";

function concertThis(input){
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsInTown.key;
    axios.get(queryUrl).then(function(res){
        var s = res.data[1];
        time = moment(s.datetime, "YYYY-MM-DDTh:mm:ss").format("MM/DD/YYYY");
        //formatting string to display
        var concertInfo = [
            "\nVenue: " + s.venue.name,
            "Location: " + s.venue.city + ", " + s.venue.country,
            "Date: " + time,
        ].join("\n\n")
        console.log(concertInfo);
        fs.appendFile("log.txt", concertInfo + divider, function(err) {
            if (err) throw err;
        })
    })
}

function spotifyThis(input){
    if (input === ""){
        input = "The Sign"
    }
    spotify.search({type: "track", query: input, limit: 1})
        .then(function(response) {
            var data = response.tracks.items[0];
            
            //take artists from json object and format them if more than one
            var artists = "";
            for (i = 0; i < data.artists.length; i++) {
                artists += data.artists[i].name
                if (i < data.artists.length - 1){
                    artists += ", ";
                }
            };
            
            //formatting string to display
            var songInfo = [
                "\nArtists: " + artists,
                "Song name: " + data.name,
                "Preview link : " + data.preview_url,
                "Album: " + data.album.name,
            ].join("\n\n")
            console.log(songInfo);
            fs.appendFile("log.txt", songInfo + divider, function(err) {
                if (err) throw err;
            })
        })
        .catch(function(err) {
            console.log(err);
        });
}

function movieThis(input){
    if (input === ""){
        input = "Mr. Nobody"
    }
    var queryUrl = "https://www.omdbapi.com/?t=" + input + "&apikey=" + OMDB;
        axios.get(queryUrl).then(function(res){
        var s = res.data

        //formatting string to display
        var movieInfo = [    
            "\nTitle: " + s.Title,
            "Year: " + s.Year,
            "IMDB: " + s.imdbRating,
            "Metascore: " + s.Metascore,
            "Country: " + s.Country,
            "Language: " + s.Language,
            "Actors: " + s.Actors,
            "Plot: " + s.Plot,
        ].join("\n\n")
        console.log(movieInfo);
        fs.appendFile("log.txt", movieInfo + divider, function(err) {
            if (err) throw err;
        })
    })
}

//decide what function to run
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
    
    //other useless thing
    if (search === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(err, data){
            if (err) {
                return console.log(err);
            }
            data = data.split(",");

            //go through normal process with text content used for search and input
            checkTerm(data[0], data[1]);
        })
    }
}

//call functions
checkTerm(process.argv[2], input);





