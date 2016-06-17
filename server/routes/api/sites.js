var codes = require('../../helpers/httpCodes')
  , Site = require ('../../models/site')
  , util = require('util');

module.exports = function (express, passport, io) {
  var router = express.Router({ mergeParams: true });
  var siteRouter = express.Router({ mergeParams:true });

  /**
   * @api {get} / Gets a list of the customers sites. If no query is provided,
   * it returns all sites. If a query is provided, the results will be filtered.
   * @apiName ListSites
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/123/sites
   *
   *   body (optional):
   *   {
   *     "query.customer": "1234"
   *   }
   */
  router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    var cb = function(err, data){
      if (err) res.send({_errors: err})
      else res.send( data );
    };
    if (req.query) { console.log('query'); return Site.find(req.user, cb, req.query); }
    else return Site.getAll(req.user, cb);
  });

  /**
   * @api {post} / Creates a new site.
   * @apiName CreateSite
   * @apiGroup Sites
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers/123/sites
   *
   *   body:
   *   {
   *     "name": "A site name"
   *   }
   */
  router.post('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Site.create(req.user, req.body, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
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
    Site.findById(req.user, req.params.site_id, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
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
    Site.update(req.user, req.body, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
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
