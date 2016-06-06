var codes = require('../../helpers/httpCodes');

module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });
  var orgRouter = express.Router({mergeParams: true});

  router.post('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  router.use('/:org_id', orgRouter);

  orgRouter.get('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  orgRouter.put('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  orgRouter.delete('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
}
