var express = require('express')
  , router = express.Router({mergeParams: true})
  , eventRouter = express.Router({mergeParams: true})
  , codes = require('../../helpers/httpCodes');

router.get('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

router.post('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

router.use('/:event_id', eventRouter);

eventRouter.get('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

eventRouter.put('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

module.exports = router;
