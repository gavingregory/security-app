var codes = require('../../helpers/httpCodes');
module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });

  /**
   * @api {post} /login Login and obtain a session key.
   * @apiName Login
   * @apiGroup Authentication
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/auth/login
   *
   *   body:
   *   {
   *     "username": "user",
   *     "password": "pass"
   *   }
   *
   * @apiParam {string} username The username to login with.
   * @apiParam {string} password The password to login with.
   */
  router.post('/login', passport.authenticate('local'), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {post} /logout Logout and invalidate the current session.
   * @api {get}  /logout Logout and invalidate the current session.
   * @apiName Logout
   * @apiGroup Authentication
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/auth/logout
   */
  var logout;
  router.get('/logout', logout = function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });
  router.post('/logout', logout);

  /**
   * @api {post} /passwordreset Request a password reset email.
   * @apiName PasswordReset
   * @apiGroup Authentication
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/auth/passwordreset
   *
   *   body:
   *   {
   *     "username": "user",
   *     "email": "example@example.com"
   *   }
   *
   * @apiParam {string} username The username of the account.
   * @apiParam {string} email The email address registered for this account.
   */
  router.post('/passwordreset', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });
  return router;
}
