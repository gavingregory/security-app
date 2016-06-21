var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact');

var Organisation = function () {
  /**
   * Organisation Schema
   */

  var _schema = new Schema({
    name: { type: String, required: true },
  }, { timestamps: true });

  /**
   * Organisation Model
   */

  var _model = mongoose.model('Organisation', _schema);

  /**
   * Public Functions
   */

  var _get = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model
      .findOne({_id: authenticated_user.domain})
      .exec(cb);
  };

  /**
   * Module Export API
   */

  return {
    schema: _schema,
    model: _model,
    get: _get
  };

}();

module.exports = Organisation;
