var mongoose = require('mongoose')
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact')
  , Schema = mongoose.Schema;

var Site = function () {

  /**
   * Site Schema
   */

  var _schema = new Schema({
    name: String,
    address: { addressSchema },
    contacts: [ contactSchema ],
    domain: {type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', required: true }
  }, { timestamps: true });

  _schema.virtual('address.full').get(function() {
    return [this.address.number, this.address.street, this.address.district, this.address.county, this.address.city, this.address.pc_zip, this.address.country];
  });

  /**
   * Site Model
   */

  var _model = mongoose.model('Site', _schema);

  /**
   * Public Functions
   */

  var _getAll = function (authenticated_user, cb) {
    return _model.find({domain: authenticated_user.domain}, {name:1, type:1, size:1, address:1, contacts:1}, cb);
  };

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    var c = new _model(properties);
    c.save(cb);
  };

  var _find = function (authenticated_user, cb, params) {
    var query = { domain: authenticated_user.domain };
    if (params.customer) query.customer = params.customer;
    return  _model.find(query, cb)
  }

  /**
   * Module Export API
   */

  return {
    schema: _schema,
    model: _model,
    getAll: _getAll,
    create: _create,
    find: _find
  };

}();

module.exports = Site;
