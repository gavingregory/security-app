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

var user = function () {

  /**
   * User Schema
   */

  var _schema = Schema({
    username : { type: String, required: true, index: { unique: true } },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
    password : { type: String, required: true },
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
  }, { timestamps: true });

  /**
  * The virtual property 'isLocked'.
  * @return {boolean} True if the user is locked due to max password attempts, false if not.
  */
  _schema.virtual('isLocked').get(function () {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
  });

  /**
  * Middleware that executes prior to any save.
  * @param {function} next - The next function to execute on completion.
  */
  _schema.pre('save', function (next) {
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
  _schema.methods.comparePassword = function (candidatePassword, cb) {
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
  _schema.methods.incLoginAttempts = function (cb) {
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
   * User Model
   */

  var _model = mongoose.model('User', _schema);

  /**
   * Public Functions
   */

  /**
  * Enum of reasons why the login failed.
  * @enum {number}
  */
  var _failedLoginReasons = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
  };

  /**
  * Enum of reasons why a bearer token authentication failed.
  * @enum {number}
  */
  var _failedTokenReasons = {
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
  var _encodeToken = function (username, password) {
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
  var _decodeToken = function (token, cb) {
    var decoded = jwt.decode(token, params.token.key);
    if (typeof decoded !== 'object') return cb(null, null, _failedTokenReasons.INVALID_OBJECT);
    if (decoded.expiry < Date.now()) return cb(null, null, _failedTokenReasons.EXPIRED);
    _model.findOne({ username: decoded.username }, function (err, user) {
      if (err) return cb(err);
      if (!user) return cb(null, null, _failedTokenReasons.NOT_FOUND);
      if (user.isLocked) return cb(null, null, _failedTokenReasons.LOCKED);
      if (decoded.password != user.password) return cb(null, null, _failedTokenReasons.PASSWORD_INCORRECT);
      user.password = undefined;
      user.__v = undefined;
      user.loginAttempts = undefined;
      return cb(null, user);
    });
  };

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    properties.domain = authenticated_user.domain;
    var u = new _model(properties);
    u.save(cb);
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
  var _authenticate = function (username, password, cb) {
    _model.findOne({ username: username }, function (err, user) {
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

  /**
   * Module Export API
   */

  return {
    model: _model,
    schema: _schema,
    failedLoginReasons: _failedLoginReasons,
    failedTokenReasons: _failedTokenReasons,
    decodeToken: _decodeToken,
    encodeToken: _encodeToken,
    create: _create,
    authenticate: _authenticate
  };

}();

module.exports = user;
