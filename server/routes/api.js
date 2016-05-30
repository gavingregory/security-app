var express = require('express')
  , router = express.Router({mergeParams: true});

router.get('/', function (req, res) {
  res.send('API Accessed');
});

module.exports = router;
