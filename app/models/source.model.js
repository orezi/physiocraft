// app/models/source.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define our source model
// module.exports allows us to pass this to other files when it is called
var sourceSchema = new Schema({
  sourceName: {
  	type: String, 
  	required: true,
    unique: true
  },
  sourceDescription: {
    type: String,
    required: true
  },
  sourceNumber1: {
    type: Number,
    required: true
  },
  sourceNumber2: {
    type: Number
  },
  marketingRef: {
    type: String,
    ref: 'User',
    required: true
  },
});

var Source = mongoose.model('Source', sourceSchema);

module.exports = Source;