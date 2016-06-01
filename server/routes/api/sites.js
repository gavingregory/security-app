var codes = require('../../helpers/httpCodes');

module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });
  var siteRouter = express.Router({ mergeParams:true });

  router.get('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  router.post('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  router.use('/:site_id', siteRouter);

  siteRouter.get('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  siteRouter.put('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  siteRouter.delete('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
};
