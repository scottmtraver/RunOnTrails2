// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SponsorSchema = new Schema({
  name: String,
  url: String,
  logoUrl: String
});

mongoose.model('Sponsor', SponsorSchema);

