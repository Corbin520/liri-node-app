
// set what are known as environment variables to the global `process.env` object in node, from .env file
require("dotenv").config();

// require the keys file and set its exports to var keys
var keys = require("./keys.js");


var Spotify = require('node-spotify-api');

 
var spotify = new Spotify(keys.spotify);

// use argument1 to pass the data of what API we are going to be hitting
var argument1 = process.argv[2];
var argument2 = process.argv[3];

spotify.search({ type: 'track', query: argument2 }, function(err, data) {
  if ( err ) {
      console.log('Error occurred: ' + err);
      return;
  };

  for (var i = 0; i <  data.tracks.items.length; i++) {
    if (i === 4) break

    var video = data.tracks.items[i].preview_url || "Not available";

  // * The album that the song is from
  console.log("----------------------------")
  console.log("Artist: " + data.tracks.items[i].artists[0].name);
  console.log("Song: " + data.tracks.items[i].name)
  console.log("Video: " + video)
  console.log("Album Name: " + data.tracks.items[i].album.name)
  console.log("----------------------------")
  }

});










// OMDB INFO
// Send all data requests to for OMDB:
// http://www.omdbapi.com/?apikey=[yourkey]&
// URL with perams http://www.omdbapi.com/

//BANDS IN TOWN INFO
// URL with perams https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0