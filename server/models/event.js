var mongoose = require('mongoose'),
  contactSchema = require('./schemas/contact'),
  comment = require('./comment'),
  Schema = mongoose.Schema;

var Event = function () {

  /**
   * Event Schema
   */

  var _schema = new Schema({
    domain: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    site: {type: Schema.Types.ObjectId, ref: 'Site', required: true },
    loggedBy: { name: {first: String, last: String}, link: { type: Schema.Types.ObjectId, ref: 'User', required: true }},
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  }, { timestamps: true });


  /**
   * Event Model
   */

  var _model = mongoose.model('Event', _schema);

  /**
   * Public Functions
   */

   var _get = function (authenticated_user, id, cb) {
     if (!authenticated_user) throw new Error('User required.');
     if (!authenticated_user.domain) throw new Error('User domain required.');
     _model.find({domain: authenticated_user.domain, _id: id}, cb);
   };

  var _getAll = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model
      .find({domain: authenticated_user.domain})
      .populate('category', 'name colour description')
      .exec(cb);
  };

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    properties.event.domain = authenticated_user.domain;
    properties.event.loggedBy = {
      name: authenticated_user.name,
      link: authenticated_user._id
    };
    var e = new _model(properties.event);
    e.save(function(err, data){
      if (err) return cb(err);
      return comment.create(authenticated_user, {comment: properties.comment, event: data._id}, cb);
    });
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

  /**
  * Module Export API
  */

  return {
    schema: _schema,
    model: _model,
    get: _get,
    getAll: _getAll,
    create: _create,
    remove: _remove
  };

}();

module.exports = Event;
