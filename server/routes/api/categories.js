var codes = require('../../helpers/httpCodes');
var Category = require('../../models/category');

module.exports = function (express, passport, io) {
  var router = express.Router({ mergeParams: true });
  var categoryRouter = express.Router({ mergeParams: true });

  /**
   * @api {get} / Get a list of categories.
   * @apiName ListCategories
   * @apiGroup Categories
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/categories
   */
  router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Category.getAll(req.user, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
  });

  /**
   * @api {post} / Create a new category.
   * @apiName CreateCategory
   * @apiGroup Categories
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/categories
   */
  router.post('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Category.create(req.user, req.body, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      else return res.send(data);
    });
  });

  router.use('/:category_id', categoryRouter);

  /**
   * @api {get} /:category_id Get details of a category.
   * @apiName GetCategory
   * @apiGroup Categories
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/categories
   */
  categoryRouter.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Category.findById(req.user, req.params.category_id, function (err, data) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send(data);
    });
  });

  /**
   * @api {put} /:category_id Update the given category.
   * @apiName UpdateCategory
   * @apiGroup Categories
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/categories
   */
  categoryRouter.put('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {delete} /:category_id Delete the given category.
   * @apiName DeleteCategory
   * @apiGroup Categories
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/categories
   */
  categoryRouter.delete('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Category.remove(req.user, req.params.category_id, function (err, doc, result) {
      if (err) return res.status(codes.bad_request).send(err);
      return res.send({result: result, doc: doc});
    });
  });

  return router;
}
