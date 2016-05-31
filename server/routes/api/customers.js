var express = require('express')
  , router = express.Router({mergeParams: true});

router.get('/', function (req, res) {
  res.status(200).send('Customers Accessed');
});

module.exports = router;
