var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact');

var Site = function () {

  /**
   * Site Schema
   */

  var _schema = new Schema({
    name: String,
    address: addressSchema,
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
    return _model
             .find({domain: authenticated_user.domain})
             .populate('customer', 'name')
             .exec(cb);
  };

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    properties.domain = authenticated_user.domain;
    var c = new _model(properties);
    c.save(cb);
  };

  var _find = function (authenticated_user, cb, params) {
    var query = { domain: authenticated_user.domain };
    if (params.customer) query.customer = params.customer;
    return  _model
              .find(query)
              .populate('customer', 'name')
              .exec(cb);
  }

  var _findById = function (authenticated_user, id, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.findOne({domain: authenticated_user.domain, _id: id}, cb);
  };

  var _update = function (authenticated_user, site, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.update({ domain: authenticated_user.domain, _id: site._id }, site, cb);
  };

  /**
   * Module Export API
   */

  return {
    schema: _schema,
    model: _model,
    getAll: _getAll,
    create: _create,
    find: _find,
    findById: _findById,
    update: _update
  };

}();

module.exports = Site;
