// app/models/treatment.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our treatment model
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
  duration: {
    type: String,
    required: true
  },
  createdAt: String,
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

treatementSchema.pre('save', function(next) {
  var treatment = this;
  var currentDate = new Date()
  var currentDate = currentDate.getDay() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear()
  treatment.createdAt = currentDate;
  next();
});

var Treatment = mongoose.model('Treatment', treatementSchema);

module.exports = Treatment;