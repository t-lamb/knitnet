
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

// the ExpressJS App
var app = express();

// server port number
app.set('port', process.env.PORT || 1337);

app.get('/', function(request, response) {
  response.send('butts');
});

app.get('/party', function(request, response) {
  response.send('woo woo woo');
});

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});