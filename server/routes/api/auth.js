var express = require('express')
  , router = express.Router({mergeParams: true});

router.get('/', function (req, res) {
  res.status(200).send('Auth Accessed');
});

module.exports = router;
