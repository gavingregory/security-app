module.exports = function (express, passport, io) {
  var router = express.Router({ mergeParams: true });
  router.use('/auth', require('./api/auth')(express, passport));
  router.use('/customers', require('./api/customers')(express, passport, io));
  router.use('/events', require('./api/events')(express, passport, io));
  router.use('/organisations', require('./api/organisations')(express, passport, io));
  router.use('/sites', require('./api/sites')(express, passport, io));
  return router;
}
