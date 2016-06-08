var codes = require('../../helpers/httpCodes');
var Organisation = require('../../models/organisation');


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
  router.post('/', passport.authenticate('bearer', {session: false}), function (req, res) {

    var o = new Organisation(req.body);
    o.save(function(err, data){
      if (err) res.send (err);
      else res.send (data);
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
