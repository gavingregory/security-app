var codes = require('../../helpers/httpCodes')
  , User = require('../../models/user');
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
  router.post('/login', function (req, res) {
    User.authenticate(req.body.username, req.body.password, function (err, user, reason) {
      if (err) throw err;
      if (user) return res.json({access_token: User.encodeToken(user.username, user.password), name: user.name });

      switch (reason) {
        case User.failedLoginReasons.NOT_FOUND:
        case User.failedLoginReasons.PASSWORD_INCORRECT:
          return res.send({_errors: [{message: 'Unable to login.'}]});
          break;
        case User.failedLoginReasons.MAX_ATTEMPTS:
          //TODO: Generate an email to explain max attempts.
          return res.send({_errors: [{message: 'Unable to login.'}]});
          break;
      }
    });
  });

  /**
   * @api {post} /logout Logout and invalidate the current session.
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

  /**
   * TODO: document this API
   */
  router.post('/create', passport.authenticate('bearer', {session: false}), function (req, res) {
    User.create(req.user, req.body, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
  });

  /**
   * @api {get} /status Request the authentication status.
   * @apiName Status
   * @apiGroup authentication
   *
   * @apiExample Example usage:
   * endpoint: http://localhost:8080/api/v1/auth/status
   */
  router.get('/status', passport.authenticate('bearer', {session: false}), function (req, res) {
      return res.status(codes.ok).send(req.user);
  })

  return router;
}
