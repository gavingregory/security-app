var express = require('express')
  , router = express.Router({mergeParams: true})
  , codes = require('../../helpers/httpCodes');

router.post('/login', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

var logout;
router.get('/logout', logout = function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});
router.post('/logout', logout);

router.post('/passwordreset', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

module.exports = router;
