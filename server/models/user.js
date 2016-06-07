var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , bcrypt   = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , MAX_LOGIN_ATTEMPTS = 5
  , LOCK_TIME = 2 * 60 * 60 * 1000
  , TOKEN_EXPIRY = 24 * 60 * 60 * 1000 /* hours minutes seconds milliseconds */
  , jwt = require('jwt-simple')
  , params = require('../config/settings');

// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
// http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose

var schema = Schema({
  username : { type: String, required: true, index: { unique: true } },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  password : { type: String, required: true },
  created : { type: Date, default: Date.now },
  updated	: { type: Date, default: Date.now },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number },
  access_orgs: [{
    link: {type: Schema.Types.ObjectId, ref: 'Organisation'},
    permission: Number
  }],
  access_sites: [ {
    link: {type: Schema.Types.ObjectId, ref: 'Site'},
    permission: Number
  }],
  access_custs: [ {
    link: {type: Schema.Types.ObjectId, ref: 'Customer'},
    permission: Number
  }],
  domain: { type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
});

/**
 * The virtual property 'isLocked'.
 * @return {boolean} True if the user is locked due to max password attempts, false if not.
 */
schema.virtual('isLocked').get(function () {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

/**
 * Middleware that executes prior to any save.
 * @param {function} next - The next function to execute on completion.
 */
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

/**
 * Callback for comparing passwords.
 *
 * @callback comparePasswordCallback
 * @param {object} err - Error (if one has occurred) or null.
 * @param {boolean} isMatch - true if the passwords match, false if not.
 */

/**
 * Compares a given unencrypted password with this users encrypted password.
 * @param {string} candidatePassword - the candidate password to compare.
 * @param {comparePasswordCallback} cb - The callback to execute on completion.
 */
schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * Callback for incrementing login attempts.
 *
 * @callback incLoginAttemptsCallback
 * @param {object} err - Error (if one has occurred) or null.
 */

/**
 * Increment this users login attempts.
 * @param {incLoginAttemptsCallback} cb - The callback to execute on completion.
 */
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

/**
 * Enum of reasons why the login failed.
 * @enum {number}
 */
var reasons = schema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
};

/**
 * Enum of reasons why a bearer token authentication failed.
 * @enum {number}
 */
var tokenReasons = schema.statics.failedToken = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  LOCKED: 2,
  EXPIRED: 3,
  INVALID_OBJECT: 4
};

/**
 * Encode a token for the given username and password.
 * @param {string} username - The username of the authenticated user.
 * @param {string} password - the encrypted password of the authenticated user.
 * @return {string}
 */
schema.statics.encodeToken = function (username, password) {
  var payload = {
    username: username,
    password: password,
    expiry: Date.now() + TOKEN_EXPIRY
  }
  return jwt.encode(payload, params.token.key);
};

/**
 * Callback for decoding a bearer token.
 *
 * @callback decodeTokenCallback
 * @param {object} err - Error (if one has occurred) or null.
 * @param {object} user - The user object if successful, or null.
 * @param {number} reason - The reason for a decode failure, if failed.
 */

/**
 * Decodes the given token.
 * @param {string} token - The token to decode.
 * @param {decodeTokenCallback} cb - The callback to execute on completion.
 */
schema.statics.decodeToken = function (token, cb) {
  var decoded = jwt.decode(token, params.token.key);
  if (typeof decoded !== 'object') return cb(null, null, tokenReasons.INVALID_OBJECT);
  if (decoded.expiry < Date.now()) return cb(null, null, tokenReasons.EXPIRED);
  this.findOne({ username: decoded.username }, function (err, user) {
    if (err) return cb(err);
    if (!user) return cb(null, null, tokenReasons.NOT_FOUND);
    if (user.isLocked) return cb(null, null, tokenReasons.LOCKED);
    if (decoded.password != user.password) return cb(null, null, tokenReasons.PASSWORD_INCORRECT);
    user.password = undefined;
    user.__v = undefined;
    user.loginAttempts = undefined;
    return cb(null, user);
  });
};

/**
 * Callback for authenticating a user.
 *
 * @callback getAuthenticatedCallback
 * @param {object} err - Error (if one has occurred) or null.
 * @param {object} user - The user object if successful, or null.
 * @param {number} reason - The reason for a failure, if failed.
 */

/**
 * Attempts to authenticate a user based on the credentials provided.
 * @param {string} username - The username provided by the user.
 * @param {string} password - The password provided by the user.
 * @param {getAuthenticatedCallback} cb - The callback to execute on completion.
 */
schema.statics.getAuthenticated = function (username, password, cb) {
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
};

module.exports = mongoose.model('User', schema);
