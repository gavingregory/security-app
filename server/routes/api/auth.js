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
    User.getAuthenticated(req.body.username, req.body.password, function (err, user, reason) {
      console.log(err + "\n" + user + "\n" + reason);
      if (err) throw err;
      if (user) return res.send(User.encodeToken(user.username, user.password));

      switch (reason) {
        case User.failedLogin.NOT_FOUND:
          console.log('not found');
        case User.failedLogin.PASSWORD_INCORRECT:
          console.log('password incorrect');
          return res.send({_errors: [{message: 'Unable to login.'}]});
          break;
        case User.failedLogin.MAX_ATTEMPTS:
          console.log('max attempts');
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
    User.decodeToken(req.body.token, function (err, user, reason) {
      if (err) return res.send(err);
      if (user) return res.send(user);
      return res.send(reason);
    });
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
  router.post('/create', function (req, res) {
    var u = new User(req.body);
    u.save(function (err, data) {
      if (err) return res.status(500).send(err);
      return res.send(data);
    })
  });

  return router;
}
