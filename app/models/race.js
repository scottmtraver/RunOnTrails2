var Venue = require('./venue');
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var RaceSchema = new Schema({
  name: String,
  date: Date,
  seriesNum: String,
  registrationTime: String,
  startTime: String,
  cost: String,
  distances: String,
  courseUrl: String,
  courseDescription: String,
  special: String,
  venue: Venue
});

mongoose.model('Race', RaceSchema);

