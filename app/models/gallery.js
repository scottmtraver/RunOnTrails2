var mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema;

var GallerySchema = new Schema({
  url: String,
  dateUploaded: Date
});

GallerySchema.plugin(mongoosePaginate);

mongoose.model('Gallery', GallerySchema);


