var codes = require('../../helpers/httpCodes');
var Site = require ('../../models/site');
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
  router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return Site.getAll(function(err, data){
      if (err) res.send({_errors: err})
      else res.send( data );
    }, "option");
  });

  /**
   * @api {post} / Creates a new site.
   * @apiName CreateSite
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/123/sites
   */
  router.post('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    var s = new Site(req.body);
    s.save(function(err, data){
      if (err) return res.status(codes.bad_request).send(err);
      else return res.send(data);
    })
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
  siteRouter.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
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
  siteRouter.put('/', passport.authenticate('bearer', {session: false}), function (req, res) {
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
  siteRouter.delete('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
};
