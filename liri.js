require("dotenv").config();

//Grab data from keys.js
var keys = require('./keys.js');
//require axios
var axios = require("axios");
//require spotify
var Spotify = require('node-spotify-api');
//require moment
var moment = require('moment')

//spotify keys info
var spotify = new Spotify(keys.spotify);

// Store all of the arguments in an array
var nodeArgs = process.argv;

//create a var for command
var command =  process.argv[2];

// Create an empty variable for holding the search title
var title = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    title = title + "+" + nodeArgs[i];
  }
  else {
    title += nodeArgs[i];

  }
}

//switch case
switch(command){
    case "concert-this":
      if(title){
      concertThis(title);
    }else {
        console.log("Sorry can't find data")
    }
    break;
  
    case "spotify-this-song":
      if(title){
        spotifySong(title);
      } else{
        spotifySong("The Sign by Ace of Base");
      }
    break;
  
    case "movie-this":
      if(title){
        omdbData(title)
      } else{
        omdbData("Mr. Nobody")
      }
    break;
  
    case "do-what-it-says":
      doThing();
    break;
    }

    function concertThis(title){
        // Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data);
  }
);
    }

    function omdbData(title){
        // Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  }
);
    }

    function spotifySong(title){
        spotify.search({ type: 'track', query: title}, function(error, data){
            if(!error){
              for(var i = 0; i < data.tracks.items.length; i++){
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song: " + songData.name);
                //spotify preview link
                console.log("Preview URL: " + songData.preview_url);
                //album name
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");
                
              }
            } else{
              console.log('Error occurred.');
            }
          });
    }