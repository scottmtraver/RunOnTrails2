var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  passport = require('passport'),
  mongoose = require('mongoose');
var forceDomain = require('forcedomain');

mongoose.connect(config.db);
var db = mongoose.connection;
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
app.use(forceDomain({
  hostname: 'www.runontrails.com'
}));
require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
