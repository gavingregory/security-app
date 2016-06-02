var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , bcrypt   = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

var schema = Schema({
  username : { type: String, required: true, index: { unique: true } },
  password : { type: String, required: true },
  created : { type: Date, default: Date.now },
  updated	: { type: Date, default: Date.now }
});

schema.pre('save', function (next) {
  /* modify dates */
  var currentDate = new Date();
  this.updated = currentDate;
  if (!this.created) {
    this.created = currentDate;
  }

  /* salt password */
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    })
  });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', schema);
