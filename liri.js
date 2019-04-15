
var axios = require("axios");
require("dotenv").config();
var moment = require('moment');
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var BandsInTownEvents = require('bandsintown-events');
var spotify = new Spotify(keys.spotify);
var argument1 = process.argv[2];


// Switch arguments
switch(argument1) {
  case "spotify-this-song":
  spotifyFunction()

    break;
  case "movie-this":
  movieThisFunction();
   
  break;
  case "concert-this":
  bandsInTownFunction();

  break;
  case "do-what-it-says":
  doWhatItSays();
}

// Spotify
function spotifyFunction() {
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
    console.log("--------------------")
    console.log("Artist: " + data.tracks.items[i].artists[0].name);
    console.log("Song: " + data.tracks.items[i].name)
    console.log("Video: " + video)
    console.log("Album Name: " + data.tracks.items[i].album.name)
    console.log("--------------------")
    }
  });   
}; 

// Movie This
function movieThisFunction() {
  var argument2 = process.argv[3];
  if (argument2) {
axios.get("http://www.omdbapi.com/?t=" + argument2 + "&apikey=68c1ef63").then(
  function(response) {
    console.log("--------------------")
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country where movie was produced: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("--------------------")
  }
);
} else {
  axios.get("http://www.omdbapi.com/?t=mr-nobody&y=&plot=short&apikey=trilogy").then(
  function(response) {
  console.log("--------------------")
  console.log("You did not search for a movie")
  console.log("If you haven't watched " + response.data.Title + " then you should")
  console.log("http://www.imdb.com/title/tt0485947")
  console.log("its on Netflix!")
  console.log("--------------------")
  })
}
};

// Do what it says
function doWhatItSays() {
  
  fs.readFile("./random.txt", "utf8", function(err, data) {
    if (err) { console.log(err) }
    
    var dataArr = data.split(',')
      
      spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        };
        for (var i = 0; i <  data.tracks.items.length; i++) {
          if (i === 4) break
          var video = data.tracks.items[i].preview_url || "Not available";

        console.log("--------------------")
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song: " + data.tracks.items[i].name)
        console.log("Video: " + video)
        console.log("Album Name: " + data.tracks.items[i].album.name)
        console.log("--------------------")
        }
      });   

  });
  
};

// Bands in Town
function bandsInTownFunction() {
  var argument2 = process.argv[3];

  axios.get("https://rest.bandsintown.com/artists/" + argument2 + "/events?app_id=codingbootcamp").then(
    
    function(response) {
      // console.log(response.data[1])
    for (var i = 0; i < response.data.length; i++) {
      if (i === 4) break
      console.log("--------------------");
      console.log("Venue name: " + response.data[i].venue.name);
      console.log("Venue Location: " + response.data[i].venue.city + " , " + response.data[i].venue.region);
      console.log("Date: " + response.data[i].datetime);
      console.log("--------------------")
    } 
  })
};



