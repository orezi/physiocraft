// app/models/product.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define our product model
// module.exports allows us to pass this to other files when it is called
var productSchema = new Schema({
  productName: {
  	type: String, 
  	required: true,
    unique: true
  },
  contactName: {
  	type: String, 
  	required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  contactNumber1: {
    type: Number,
    required: true
  },
  contactNumber2: {
    type: Number
  },
  contactNumber3: {
    type: Number
  },
  opsRef: {
    type: String,
    ref: 'User',
    required: true
  },
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;