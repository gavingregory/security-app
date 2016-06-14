var mongoose = require('mongoose'),
  contactSchema = require('./schemas/contact'),
  commentSchema = require('./schemas/comment'),
  Schema = mongoose.Schema;

var Event = function () {

  /**
   * Event Schema
   */

  var _schema = new Schema({
    domain: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    site: {type: Schema.Types.ObjectId, ref: 'Site', required: true },
    logged_by: { name: String, link: { type: Schema.Types.ObjectId, ref: 'User', required: true }},
    category: { type: Schema.Types.ObjectId, ref: 'EventCategory', required: true },
    comments: [{ commentSchema }],
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
     _model.find({organisation: authenticated_user.domain, _id: id}, cb);
   };

  var _getAll = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({organisation: authenticated_user.domain}, cb);
  };

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    properties.site = 123; // temporary until sites implemented
    properties.organisation = authenticated_user.domain;
    properties.logged_by = authenticated_user._id;
    var temp_comment = properties.comments;
    properties.comments = [
      {
        'comment': temp_comment,
        'createdBy': authenticated_user
      }
    ]
    var c = new _model(properties);
    console.log(c);
    c.save(cb, function(err){
      console.log(err);
    });
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
    schema: _schema,
    model: _model,
    get: _get,
    getAll: _getAll,
    create: _create,
    remove: _remove
  };

}();

module.exports = Event;
