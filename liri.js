require("dotenv").config();

//Grab data from keys.js
var keys = require('./keys.js');
//require axios
var axios = require("axios");
//require spotify
var Spotify = require('node-spotify-api');
//require moment
var moment = require('moment')
//require fs
var fs = require('fs');

//spotify keys info
var spotify = new Spotify(keys.spotify);

// Store all of the arguments in an array
var nodeArgs = process.argv;

//create a var for command
var command = process.argv[2];

// Create an empty variable for holding the search title
var title = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        title = title + "+" + nodeArgs[i];
    } else {
        title += nodeArgs[i];

    }
}

//switch case
switch (command) {
    case "concert-this":
        if (title) {
            concertThis(title);
        } else {
            console.log("Sorry can't find data")
        }
        break;

    case "spotify-this-song":
        if (title) {
            spotifySong(title);
        } else {
            spotifySong("The Sign by Ace of Base");
        }
        break;

    case "movie-this":
        if (title) {
            omdbData(title)
        } else {
            omdbData("Mr. Nobody")
        }
        break;

    case "do-what-it-says":
        doThing();
        break;
}
//the concert-this axios function 
function concertThis(title) {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp";
    //function to consolelog the axios response 
    axios.get(queryUrl).then(
        function (response) {
            console.log("-------------------------");
            //log the lineup
            console.log(response.data[0].lineup);
            console.log("-------------------------");
            //log the venue name, city and date
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------");
            //log the second venue name, city and date
            console.log(response.data[1].venue.name);
            console.log(response.data[1].venue.city);
            console.log(moment(response.data[1].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------");
            //log the third venue name, city and date
            console.log(response.data[2].venue.name);
            console.log(response.data[2].venue.city);
            console.log(moment(response.data[2].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------");

            //append info to log.txt
            fs.appendFile("log.txt", "\n", function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", response.data[0].lineup, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", response.data[0].venue.name, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", response.data[0].venue.city, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", moment(response.data[0].datetime).format("MM/DD/YYYY"), function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", response.data[1].venue.name, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", response.data[1].venue.city, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", moment(response.data[0].datetime).format("MM/DD/YYYY"), function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", response.data[2].venue.name, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", response.data[2].venue.city, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", moment(response.data[0].datetime).format("MM/DD/YYYY"), function (err) {
                if (err) throw err;
            });


        })
}
//the movie-this axios function
function omdbData(title) {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            //log the movie title
            console.log("Title: " + response.data.Title);
            //log the release year
            console.log("Release Year: " + response.data.Year);
            //log the IMdB rating
            console.log("IMdB Rating: " + response.data.imdbRating);
            //log the rotten tomatoes rating
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
            //log the country it was produced
            console.log("Country: " + response.data.Country);
            //log the language 
            console.log("Language: " + response.data.Language);
            //log the plot
            console.log("Plot: " + response.data.Plot);
            //log the actors
            console.log("Actors: " + response.data.Actors);

            // append to log.txt
            fs.appendFile("log.txt", "\n", function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", "Title: " + response.data.Title, function (err) {
                if (err) throw err;
            })
            fs.appendFile("log.txt", "Release Year: " + response.data.Year, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", "IMdB Rating: " + response.data.imdbRating, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + response.data.tomatoRating, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", "Country: " + response.data.Country, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", "Language: " + response.data.Language, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", "Plot: " + response.data.Plot, function (err) {
                if (err) throw err;
            });
            fs.appendFile("log.txt", "Actors: " + response.data.Actors, function (err) {
                if (err) throw err;
            });

        }
    );
}
//spotify-this-song function
function spotifySong(title) {
    spotify.search({
        type: 'track',
        query: title
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // Log Artist
        console.log(data.tracks.items[0].artists[0].name);
        // Log Song name
        console.log(data.tracks.items[0].name);
        // Log URL
        console.log(data.tracks.items[0].external_urls);
        // Log Album Name
        console.log(data.tracks.items[0].album.name);
        //append to log.txt
        fs.appendFile("log.txt", "\n", function (err) {
            if (err) throw err;
        });
        // append Artist
        fs.appendFile("log.txt", data.tracks.items[0].artists[0].name, function (err) {
            if (err) throw err;
        });
        // append Song name
        fs.appendFile("log.txt", data.tracks.items[0].name, function (err) {
            if (err) throw err;
        });
        // append URL
        fs.appendFile("log.txt", data.tracks.items[0].external_urls, function (err) {
            if (err) throw err;
        });
        // append Album Name
        fs.appendFile("log.txt", data.tracks.items[0].album.name, function (err) {
            if (err) throw err;
        });


    });
}

//do-what-it-says function
function doThing() {
    //reads random.txt file and runs the spotify-this-song function with the info in random.txt
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');
        //call to run spotify-this-song function
        spotifySong(txt[1]);
    });
}