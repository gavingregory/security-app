module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });
  router.use('/auth', require('./api/auth')(express, passport));
  router.use('/customers', require('./api/customers')(express, passport));
  router.use('/events', require('./api/events')(express, passport));
  router.use('/organisations', require('./api/organisations')(express, passport));
  router.use('/sites', require('./api/sites')(express, passport));
  return router;
}
