//include dotenv install
require('dotenv').config()

var http = require("http");

//grabbing axios package
var axios = require("axios");
/* Create an HTTP server to handle responses */

//spotify api for Node
var Spotify = require('node-spotify-api');

//require moment.js for installation
var moment = require('moment');
moment().format();

var keys = require("./keys.js");

//include file system module
var fs = require('file-system');

//include the inquirer nmp package. not sure if i need this or not
var inquirer = require("inquirer");


http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
  })
  .listen(8888);

 
  var spotify = new Spotify({
    id: 97e0f834acba44bc989d2a5237ec69fd,
    secret: d27cac25665f42ca87f014a1678caecc,

  });

   
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

  axios
  .get("http://www.omdbapi.com")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

  axios
  .get("http://www.artists.bandsintown.com/bandsintown-api")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

  // Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);

if(process.argv[2] === "concert-this") {
  var artistBand = process.argv[3];
  console.log(artistBand);
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=";

  request(queryURL, function(error, response, body) {
    if(error){
      console.log(error);
      var result = JSON.parse(body)[0];
      console.log("Venue name: " + result.venue.name);
      console.log("Venue location: " + result.venue.city);
      console.log("Date of Event: " + moment(result.datetime).format("MM/DD/YYYY")):
    } else if(process.argv[2] === "spotify-this-song") {
      var songName = process.argv[3];
      if(songName === undefined) {
        songName ="The Sign";
      }
      spotify.search({type: 'track', query: songName, limit: 10} function(err, data){
        if(err) {
          console.log("Error: " + err);
        }
        var artistArray = [];

        for (i = 0; i < data.tracks.items.length; i++) {
          var result = {
            artist: data.tracks.items[i].album.name,
            album_name: data.tracks.items[i].album.name,
            song_name: data.tracks.items[i].name,
            preview_url: data.tracks.items[i].preview_url
          }
          artistArray.push(result);
          console.log(artistArray);
        }
      })
    } else if(process.argv[2] === "movie-this") {
      var movieName = process.argv[3];
      if(movieName === undefined) {
        movieName = "Mr. Nobody";
      }
      request('http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy=' + process.argv[3], function(error, response, body){
      var result = JSON.parse(body);
      console.log("Title: " + result.Title);
      console.log("Year: " + result.Released);
      console.log("Rating: " + result.imdbRating);
      console.log("Rotten Tomatoes: " + result.Ratings[1].Value);
      console.log("Country: " + result.Country);
      console.log("Language: " + result.Language);
      console.log("Movie Plot: " + result.Plot);
      console.log("Actors: " + result.Actors);
      })
    } else if (process.argv[2] === "do-what-it-says") {
      fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

    }
  

// This block of code will create a file called "log.txt".

  fs.writeFile("log.txt", dataArr, function(err) {

  // If the code experiences any errors it will log the error to the console.
  if (err) {
    return console.log(err);
  }

  // Otherwise, it will print: "movies.txt was updated!"
  console.log("log.txt was updated!");
  }
);
