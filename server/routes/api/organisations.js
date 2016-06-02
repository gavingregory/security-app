var codes = require('../../helpers/httpCodes');

module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });
  var orgRouter = express.Router({mergeParams: true});

  /**
   * @api {post} / Creates a new organisation.
   * @apiName CreateOrganisation
   * @apiGroup Organisations
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/organisations
   */
  router.post('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  router.use('/:org_id', orgRouter);

  /**
  * @api {get} / Gets your organisation details.
  * @apiName GetOrganisation
  * @apiGroup Organisations
  *
  * @apiExample Example usage:
  *   endpoint: http://localhost:8080/api/v1/organisations
  */
  orgRouter.get('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
  * @api {put} / Updates your organisation details.
  * @apiName UpdateOrganisation
  * @apiGroup Organisations
  *
  * @apiExample Example usage:
  *   endpoint: http://localhost:8080/api/v1/organisations
  */
  orgRouter.put('/', function (req, res) {
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
  orgRouter.delete('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
}
