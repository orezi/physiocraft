// app/models/media.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our media model
// module.exports allows us to pass this to other files when it is called
var mediaSchema = new Schema({
  mediaName: {
  	type: String, 
  	required: true,
    unique: true
  },
  content: {
  	type: String, 
  	required: true
  },
  article: {
    type: Boolean,
    default: false
  },
  other: {
    type: Boolean,
    default: true
  },
  link: {
    type: Boolean,
    default: false
  },
  feature: {
    type: Boolean,
    default: false
  },
  mentions: {
    type: Boolean,
    default: false
  }
});

var Media = mongoose.model('Media', mediaSchema);

module.exports = Media;