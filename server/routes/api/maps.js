var codes = require('../../helpers/httpCodes');

module.exports = function (express, passport) {
  var router = express.Router({ mergeParams: true });

  /**
   * @api {get} /geocode Obtain geocode information from google maps.
   * @apiName Geocode
   * @apiGroup Maps
   *
   * @apiExample Example usage:
   *   endpoint: http://localhost:8080/api/v1/maps/geocode
   *
   *   body:
   *   {
   *     "address": "10 example street"
   *   }
   *
   * @apiParam {string} address The address to search for.
   */
  router.post('/geocode', function (req, res) {
    return res.status(codes.not_implemented)
      .send({_errors: [{message: 'Not yet implemented.'}]});
  });

  return router;
}
