# liri-node-app

This is a CLI app that takes user input and returns information from relevant APIS to the console.
The user inputs can take the forms:
* node liri.js concert-this (band name)
* node liri.js spotify-this-song (song name)
* node liri.js movie-this (movie name)
* node liri.js do-what-it-says

To operate this program on your own computer, you first have to download the files in this github page. Then, you should head to the folder location on Git Bash and run "npm install". This will install the essential node modules that are required in the program. Next, you need to creat a .env file that contains the following format: 

    SPOTIFY_ID=ID
    
    SPOTIFY_SECRET=SECRET
    
    BandsInTown=API KEY
    
    OMDB=API KEY

After each equal sign fill in your own API key. These keys will be called by the keys.js file and then used in the liri.js file.

## Examples:

### concert-this:

![concert](images/concert.png)

### spotify-this-song:

![spotify](images/spotify.png)

### movie-this:

![movie](images/movie.png)

### read text file:

![random](images/random.png)

### log:

![log](images/log.png)
