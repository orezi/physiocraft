// app/models/user.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define our user model
// module.exports allows us to pass this to other files when it is called
var userSchema = new Schema({
  firstname: {
  	type: String, 
  	required: true
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
  password: {
  	type: String,
  	required: true
  },
  admin: {
  	type: Boolean,
    required: true,
  	default: false
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
});

//hash password
userSchema.pre('save', function(next) {
  var user = this;
  //hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) {
    return next();
  }

  //generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }

    //change the password to the hashed version
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;