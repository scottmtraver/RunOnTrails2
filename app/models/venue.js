var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VenueSchema = new Schema({
  name: String,
  url: String,
  directionsUrl: String,
  logoUrl: String
});

mongoose.model('Venue', VenueSchema);

