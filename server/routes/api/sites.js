var express = require('express')
  , router = express.Router({mergeParams: true})
  , siteRouter = express.Router({mergeParams: true})
  , codes = require('../../helpers/httpCodes');

router.get('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

router.post('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

router.use('/:site_id', siteRouter);

siteRouter.get('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

siteRouter.put('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

siteRouter.delete('/', function (req, res) {
  return res.status(codes.not_implemented)
    .send({success: false, errors: [{message: 'Not yet implemented.'}]});
});

module.exports = router;
