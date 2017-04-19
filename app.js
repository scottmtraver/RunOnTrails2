var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  passport = require('passport'),
  mongoose = require('mongoose');
var forceDomain = require('forcedomain');

console.log('SMT ' + config.db);
mongoose.connect(config.db);
var db = mongoose.connection;

// Logging Mongoose
// http://theholmesoffice.com/mongoose-connection-best-practice/
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + config.db);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});


//Error handler
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});


// passport config
Account = mongoose.model('Account');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var app = express();
require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
