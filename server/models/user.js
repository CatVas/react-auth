const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define a model
const userSchema = new Schema({
  email: {
    lowercase: true,
    type: String,
    unique: true,
  },
  password: String,
});

// On save hook: encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(newPassword, cb) {
  bcrypt.compare(newPassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
