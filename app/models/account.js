var passportLocalMongoose = require('passport-local-mongoose');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AccountSchema = new Schema({
    username: String,
    password: String
});
AccountSchema.plugin(passportLocalMongoose);

mongoose.model('Account', AccountSchema);
