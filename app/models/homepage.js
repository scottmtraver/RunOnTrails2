var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var HomepageSchema = new Schema({
  card1Header: String,
  card1Text: String,
  card2Header: String,
  card2Text: String,
  mainText: String,
  seriesText: String
});

mongoose.model('Homepage', HomepageSchema);

