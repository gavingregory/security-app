var express = require('express')
  , router = express.Router({mergeParams: true});

router.get('/', function (req, res) {
  res.status(200).send('Sites Accessed');
});

module.exports = router;
