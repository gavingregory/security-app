var mongoose = require('mongoose')
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact')
  , Customer = require('./organisation').model
  , Schema = mongoose.Schema;

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
   * Create a temporary flag that can be accessed from within .post('save').
   * This flag indicates whether this document was a NEW document or not.
   */
  _schema.pre('save', function (next) {
    this.wasNew = this.isNew;
    console.log('SITE: pre save');
    next();
  });
//update({_id:doc.event}, {$push:{comment:doc._id}}, {}, function (err, numAffected) {
  /* create a reference to this site in the customer's sites array */
  _schema.post('save', function (doc) {
    if (doc.wasNew) {
      Customer
        .where({_id: doc.customer})
        .update({$push: {sites: {$each: [doc._id]}}})
        .exec(function (err, numAffected) {
          console.log('NEW NUMAFFECTED: ' + JSON.stringify(numAffected))
        });
    }
  });

  /* deletes all references to this customer in the organisation document */
  _schema.post('remove', function (doc) {
    Customer.update({_id:doc.customer}, {$pull:{sites: doc._id}}, function (err, numAffected) {
      if (err) console.error(err);
    });
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
