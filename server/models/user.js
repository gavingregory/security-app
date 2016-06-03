var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , bcrypt   = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , MAX_LOGIN_ATTEMPTS = 5
  , LOCK_TIME = 2 * 60 * 60 * 1000
  , TOKEN_EXPIRY = 2 * 60 * 60 * 1000
  , jwt = require('jwt-simple')
  , params = require('../config/settings');

// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
// http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose

var schema = Schema({
  username : { type: String, required: true, index: { unique: true } },
  password : { type: String, required: true },
  created : { type: Date, default: Date.now },
  updated	: { type: Date, default: Date.now },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number }
});

schema.virtual('isLocked').get(function () {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
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

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

schema.methods.incLoginAttempts = function (cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};

// expose enum on the model, and provide an internal convenience reference
var reasons = schema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
};

var tokenReasons = schema.statics.failedToken = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  LOCKED: 2,
  EXPIRED: 3,
  INVALID_OBJECT: 4
};

schema.statics.encodeToken = function (username, password) {
  var payload = {
    username: username,
    password: password,
    expiry: Date.now() + TOKEN_EXPIRY
  }
  return jwt.encode(payload, params.token.key);
};

schema.statics.decodeToken = function (token, cb) {
  var decoded = jwt.decode(token, params.token.key);
  if (typeof decoded !== 'object') return cb(null, null, tokenReasons.INVALID_OBJECT);
  if (decoded.expiry < Date.now()) return cb(null, null, tokenReasons.EXPIRED);
  this.findOne({ username: decoded.username }, function (err, user) {
    if (err) return cb(err);
    if (!user) return cb(null, null, tokenReasons.NOT_FOUND);
    if (user.isLocked) return cb(null, null, tokenReasons.LOCKED);
    if (decoded.password != user.password) return cb(null, null, tokenReasons.PASSWORD_INCORRECT);
    return cb(null, user);
  });
};

schema.static('getAuthenticated', function (username, password, cb) {
  this.findOne({ username: username }, function (err, user) {
    if (err) return cb(err);

    // make sure the user exists
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND);
    }

    // check if the account is currently locked
    if (user.isLocked) {
      // just increment login attempts if account is already locked
      return user.incLoginAttempts(function (err) {
        if (err) return cb(err);
        return cb(null, null, reasons.MAX_ATTEMPTS);
      });
    }

    // test for a matching password
    user.comparePassword(password, function (err, isMatch) {
      if (err) return cb(err);

      // check if the password was a match
      if (isMatch) {
        // if there's no lock or failed attempts, just return the user
        if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
        // reset attempts and lock info
        var updates = {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 }
        };
        return user.update(updates, function (err) {
          if (err) return cb(err);
          return cb(null, user);
        });
      }

      // password is incorrect, so increment login attempts before responding
      user.incLoginAttempts(function (err) {
        if (err) return cb(err);
        return cb(null, null, reasons.PASSWORD_INCORRECT);
      });
    });
  });
});

module.exports = mongoose.model('User', schema);
