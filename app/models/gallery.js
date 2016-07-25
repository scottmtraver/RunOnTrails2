var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GallerySchema = new Schema({
  url: String,
  dateUploaded: Date
});

mongoose.model('Gallery', GallerySchema);


