var express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , BearerStrategy = require('passport-http-bearer').Strategy
  , app =  express()
  , User = require('./models/user')
  , params = require('./config/settings')
  , http = require('http').Server(app)
  , io = require('socket.io')(http);

'use strict';

/**
 * Session
 * Sets up an express session, and stores the session status
 * in a MongoDB store, so sessions persist on server restart.
 */

var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);
 var store = new MongoDBStore({
   uri : params.session.uri,
   collection : params.session.collection
 });

store.on('error', function (error) {
  console.error(error);
  process.exit(1);
});

app.use(session({
  secret: params.session.key,
  cookie: { maxAge: params.session.max_age },
  store: store
}));

/**
 * Configure Express
 */

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(methodOverride());

/**
 * MongoDB Configuration
 */

mongoose.connect(params.database.uri, function (err) {
  if (err) { console.error(err); process.exit(1); }
  else { console.log('Successfully connected to the mongo database'); }
});

/**
 * Passport / Authentication
 */


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({username: username}, function (err, data) {
      if (err) return done(err);
      if (!user) return done(null, false, {message: 'Incorrect username'});
      if (!user.validPassword(password)) return done(null, false, {message: 'Incorrect password'});
      return done(null, user);
    })
  }
));

passport.use(new BearerStrategy(
  function (token, done) {
    User.decodeToken(token, function (err, user, reason) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user, { scope: 'all' });
    });
  }
));

/**
 * Routes
 */

app.use('/api/v1', require('./routes/api')(express, passport, io));

/**
 * No routes match, attempt to serve static content
 */
app.use(express.static(path.join(__dirname, '../client')));

/**
 * Error handling
 */
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    return res.status(500).send({_error: 'Something failed!'});
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  return res.status(500).json({ _error: err, message: 'Error handler caught this!' });
}

/**
 * The server instance
 */
var server = http.listen(8080, function () {
  console.log('Server listening at http://%s:%s', server.address().address, server.address().port);
});

/**
* Socket.IO
*/
io.on('connection', function(socket){
  console.log('a user connected');
});


module.exports = app;
