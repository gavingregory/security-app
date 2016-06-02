var codes = require('../../helpers/httpCodes');

module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });
  var siteRouter = express.Router({ mergeParams:true });

  /**
   * @api {get} / Gets a list of the customers sites.
   * @apiName ListSites
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/123/sites
   */
  router.get('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {post} / Creates a new site.
   * @apiName CreateSite
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/123/sites
   */
  router.post('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  router.use('/:site_id', siteRouter);

  /**
   * @api {get} /:site_id Gets site details.
   * @apiName GetSite
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/:customer_id/sites/:site_id
   */
  siteRouter.get('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {put} /:site_id Updates a site.
   * @apiName UpdateSite
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/:customer_id/sites/:site_id
   */
  siteRouter.put('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {delete} /:site_id Deletes a site.
   * @apiName DeleteSite
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/:customer_id/sites/:site_id
   */
  siteRouter.delete('/', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
};
