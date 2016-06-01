var express = require('express')
  , router = express.Router({mergeParams: true})
  , orgRouter = express.Router({mergeParams: true})
  , codes = require('../../helpers/httpCodes');

router.post('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

router.use('/:org_id', orgRouter);

orgRouter.get('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

orgRouter.put('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

orgRouter.delete('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

module.exports = router;
