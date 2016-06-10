var mongoose = require('mongoose')
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact')
  , customerSchema = require('./customer').schema
  , Schema = mongoose.Schema;

var Organisation = function () {
  /**
   * Organisation Schema
   */

  var _schema = new Schema({
    name: { type: String, required: true },
    customers: [{type: Schema.Types.ObjectId, ref: 'Customer'}]
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
    _model.findOne({_id: authenticated_user.domain}, cb);
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
