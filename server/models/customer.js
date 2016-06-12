var mongoose = require('mongoose')
, contactSchema = require('./schemas/contact')
, addressSchema = require('./schemas/address')
, Site = require('./site')
, Organisation = require('./organisation').model
, Schema = mongoose.Schema;

var Customer = function () {

  /**
   * Customer Schema
   */
  var _schema = new Schema({
    name: {type: String, required: true}, /* trading name */
    trading_name: {type: String}, /* registered company name */
    address: addressSchema,
    contacts: [ contactSchema ],
    organisation: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
  }, { timestamps: true });

  /* create a temporary flag - wasNew so that in post events, we know whether this document
  was a newly created document or not */
  _schema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
  });

  /* create a reference to this customer in the organisation's customer array */
  _schema.post('save', function (doc) {
    if (doc.wasNew) Organisation.update({_id:doc.organisation}, {$push:{customers:{$each:[doc._id]}}}, {}, function (err, numAffected) {
      if (err) console.error(err);
    });
  });

  /* deletes all references to this customer in the organisation document */
  _schema.post('remove', function (doc) {
    Organisation.update({_id:doc.organisation}, {$pull:{customers: doc._id}}, function (err, numAffected) {
      if (err) console.error(err);
    });
  });

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
    var c = new _model(properties);
    c.save(cb);
  };

  var _findByName = function (authenticated_user, name, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({organisation: authenticated_user.domain, name: name}, cb);
  };

  var _getAll = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({organisation: authenticated_user.domain}, cb);
  };

  var _remove = function (authenticated_user, id, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.findOne({organisation: authenticated_user.domain, _id: id}, function (err, doc) {
      if (err) return cb(err);
      if (!doc) return cb(err, doc);
      doc.remove(cb);
    });
  };

  /**
   * Module Export API
   */
  return {
    model: _model,
    schema: _schema,
    create: _create,
    findByName: _findByName,
    getAll: _getAll,
    remove: _remove
  };

}();

module.exports = Customer;
