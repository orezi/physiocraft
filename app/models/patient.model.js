// app/models/patient.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define our patient model
// module.exports allows us to pass this to other files when it is called
var patientSchema = new Schema({
  firstname: {
  	type: String, 
  	required: true,
    unique: true
  },
  lastname: {
  	type: String, 
  	required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  referralSource: {
    type: String
  },
  billPerSession: {
    type: String
  },
  physioRef: {
    type: String,
    ref: 'User',
    required: true
  },
});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;