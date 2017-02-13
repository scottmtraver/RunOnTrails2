var Venue = require('./venue');
var Sponsor = require('./sponsor');
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var RaceSchema = new Schema({
  name: String,
  date: Date,
  seodate: String,
  seriesNum: String,
  registrationTime: String,
  startTime: String,
  cost: String,
  distances: String,
  courseUrl: String,
  resultsUrl: String,
  courseDescription: String,
  special: String,
  venue: Venue,
  sponsor: Sponsor,
});

mongoose.model('Race', RaceSchema);

