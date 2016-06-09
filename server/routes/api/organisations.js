var codes = require('../../helpers/httpCodes');
var Organisation = require('../../models/organisation').model;
var User = require('../../models/user');


module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });

  /**
   * @api {post} / Creates a new organisation.
   * @apiName CreateOrganisation
   * @apiGroup Organisations
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/organisations
   */
  router.post('/', function (req, res) {
    console.log(req.body);
    if (!req.body) throw new Error('Need a body.');
    if (!req.body.user) throw new Error('Need a user.');
    var _organisation = new Organisation(req.body);
    _organisation.save(function(err, organisation){
      if (err) return res.send(err);
      req.body.user.domain = organisation._id;
      var _user = new User(req.body.user);
      _user.save(function (err, user) {
        if (err) return res.send(err);
        return res.send({user: user, organisation: organisation});
      });
    });
  });

  /**
  * @api {get} / Gets your organisation details.
  * @apiName GetOrganisation
  * @apiGroup Organisations
  *
  * @apiExample Example usage:
  *   endpoint: http://localhost:8080/api/v1/organisations
  */
  router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Organisation.find({_id: req.user.domain })
      .then(function (err, data) {
        if (err) return res.send(err);
        return res.send(data);
      })
  });

  /**
  * @api {put} / Updates your organisation details.
  * @apiName UpdateOrganisation
  * @apiGroup Organisations
  *
  * @apiExample Example usage:
  *   endpoint: http://localhost:8080/api/v1/organisations
  */
  router.put('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {delete} / Deletes your organisation.
   * @apiName DeleteOrganisation
   * @apiGroup Organisations
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/organisations
   */
  router.delete('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
}
