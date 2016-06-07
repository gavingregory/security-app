var codes = require('../../helpers/httpCodes');
var Customer = require('../../models/customer');
module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });
  var customerRouter = express.Router({ mergeParams: true });

  /**
   * @api {get} / Get a list of customers.
   * @apiName ListCustomers
   * @apiGroup Customers
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers
   */
  router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    Customer.find({}, function (err, data) {
      if (err) return res.status(500).send(err);
      return res.send(data);
    });
  });

  /**
   * @api {post} / Create a new customer.
   * @apiName CreateCustomer
   * @apiGroup Customers
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers
   */
  router.post('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    var c = new Customer(req.body);
    c.save(function(err, data){
      if (err) res.send( err )
      else res.send( data );
    });

  });

  router.use('/:customer_id', customerRouter);

  /**
   * @api {get} /:customer_id Get details of a customer.
   * @apiName GetCustomer
   * @apiGroup Customers
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers
   */
  customerRouter.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {put} /:customer_id Update the given customer.
   * @apiName UpdateCustomer
   * @apiGroup Customers
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers
   */
  customerRouter.put('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  /**
   * @api {delete} /:customer_id Delete the given customer.
   * @apiName DeleteCustomer
   * @apiGroup Customers
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/customers
   */
  customerRouter.delete('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  customerRouter.use('/sites', require('./sites')(express, passport));

  return router;
}
