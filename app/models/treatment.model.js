// app/models/user.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define our user model
// module.exports allows us to pass this to other files when it is called
var treatementSchema = new Schema({
  history: {
  	type: String, 
  	required: true
  },
  treatmentDetails: {
  	type: String, 
  	required: true
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true
  },
  physioRef: {
    type: String,
    ref: 'User',
    required: true
  },
  patientRef: {
    type: String,
    ref: 'Patient',
    required: true
  }
});

var Treatment = mongoose.model('Treatment', treatementSchema);

module.exports = Treatment;