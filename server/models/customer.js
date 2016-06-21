var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact');

var Customer = function () {

  /**
   * Customer Schema
   */
  var _schema = new Schema({
    name: {type: String, required: true}, /* trading name */
    trading_name: {type: String}, /* registered company name */
    address: addressSchema,
    contacts: [ contactSchema ],
    domain: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    organisation: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
  }, { timestamps: true });

  /**
   * Customer Model
   */
  var _model = mongoose.model('Customer', _schema);

  /**
  * Public Functions
  */

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    properties.organisation = authenticated_user.domain;
    properties.domain = authenticated_user.domain;
    var c = new _model(properties);
    c.save(cb);
  };

  var _findByName = function (authenticated_user, name, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({domain: authenticated_user.domain, name: name}, cb);
  };

  var _findById = function (authenticated_user, id, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.findOne({domain: authenticated_user.domain, _id: id}, cb);
  };

  var _getAll = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({domain: authenticated_user.domain}, cb);
  };

  var _remove = function (authenticated_user, id, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.findOne({domain: authenticated_user.domain, _id: id}, function (err, doc) {
      if (err) return cb(err);
      if (!doc) return cb(err, doc);
      doc.remove(cb);
    });
  };

  var _update = function (authenticated_user, customer, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.update({ domain: authenticated_user.domain, _id: customer._id }, customer, cb);
  };

  /**
   * Module Export API
   */
  return {
    model: _model,
    schema: _schema,
    create: _create,
    findByName: _findByName,
    findById: _findById,
    getAll: _getAll,
    remove: _remove,
    update: _update
  };

}();

module.exports = Customer;
