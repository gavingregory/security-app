var express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , mongoose = require('mongoose')
  , app = express();

'use strict';

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(methodOverride());

/**
 * Routes
 */
var api = require('./routes/api');
app.use('/api/v1', api);

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
    res.status(500).send({error: 'Something failed!'});
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500).render('error', { error: err });
}

/**
 * The server instance
 */
var server = app.listen(8080, function () {
  console.log('Server listening at http://%s:%s', server.address().address, server.address().port);
});

module.exports = app;
