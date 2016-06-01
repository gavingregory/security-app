var express = require('express')
  , router = express.Router({mergeParams: true})
  , customerRouter = express.Router({mergeParams: true})
  , sitesRouter = require('./sites')
  , codes = require('../../helpers/httpCodes');

router.get('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

router.post('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

router.use('/:customer_id', customerRouter);

customerRouter.get('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

customerRouter.put('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

customerRouter.delete('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({_errors: [{message: 'Not yet implemented.'}]});
});

customerRouter.use('/sites', sitesRouter);

module.exports = router;
