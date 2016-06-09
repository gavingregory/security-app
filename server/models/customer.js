var mongoose = require('mongoose')
, contactSchema = require('./schemas/contact')
, Site = require('./site')
, Organisation = require('./organisation').model
, Schema = mongoose.Schema;

var Customer = function () {

  // schema
  var _schema = new Schema({
    name: {type: String, required: true}, /* trading name */
    company: {type: String, required: true}, /* registered company name */
    contacts: [ contactSchema ],
    organisation: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
  });

  /* create a temporary flag - wasNew so that in post events, we know whether this document
  was a newly created document or not */
  _schema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
  });

  /* create a reference to this customer in the organisation's customer array */
  _schema.post('save', function (doc) {
    console.log(doc.wasNew);
    if (doc.wasNew)
    Organisation.update({_id:doc.organisation}, {$push:{customers:{$each:[doc._id]}}}, {}, function (err, numAffected) {
      console.log('err: ' + err)
      console.log('num: ' + JSON.stringify(numAffected))
    });
    //  Organisation.findOne(doc.organisation, function (err, org) {
    //   if (err) return console.error('Error linking new customer to existing organisation.\n' + err);
    //   org.customers.push(doc._id);
    //   org.save(function (err) {
    //     if (err) return console.error('Error when attempting to save organisation after a new customer.\n' + err);
    //   });
    // });
  });

  _schema.post('remove', function (doc) {
    Organisation.update({ _id: doc.organisation }, { $pullAll: { customers: [doc._id] } }, function (err, numAffected) {
      if (err) console.error(err);
      console.log('num: ' + JSON.stringify(numAffected))
    });
  });

  _schema.statics.getCustomers = function (user, cb) {
    if (!user) throw 'User required.';
    if (!user.domain) throw 'User domain required.';
    this.model('Customer').find({organisation: user.domain}, cb);
    //TODO: change this to query the sub document of organisation, not the customer model
  }

  /**
   * Customer Model
   */
  var _model = mongoose.model('Customer', _schema);

  /**
  * Public Functions
  */

  var _create = function (authenticated_user, name, company, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    var c = new _model({name: name, organisation: authenticated_user.domain, company: company});
    c.save(function (err, doc) {
      if (err) return cb(err);
      return cb(null, doc);
    });
  };

  var _findByName = function (authenticated_user, name, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({name: name, organisation: authenticated_user.domain}, cb);
  };

  var _getAll = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({organisation: authenticated_user.domain}, cb);
  };

  /**
   * Module Export API
   */
  return {
    model: _model,
    schema: _schema,
    create: _create,
    findByName: _findByName
  }

}();

module.exports = Customer;
