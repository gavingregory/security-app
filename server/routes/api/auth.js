var codes = require('../../helpers/httpCodes');
module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });

  router.post('/login', passport.authenticate('local'), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  var logout;
  router.get('/logout', logout = function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });
  router.post('/logout', logout);

  router.post('/passwordreset', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });
  return router;
}
