var express = require('express')
  , router = express.Router({mergeParams: true});

router.use('/auth', require('./api/auth'));
router.use('/customers', require('./api/customers'));
router.use('/events', require('./api/events'));
router.use('/organisations', require('./api/organisations'));
router.use('/sites', require('./api/sites'));

module.exports = router;
