
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Category = function () {

  /**
   * Category Schema
   */

  var _schema = Schema({
    domain: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    event: {type: Schema.Types.ObjectId, ref: 'Event', required: true },
    loggedBy: { name: String, user: { type: Schema.Types.ObjectId, ref: 'User' }},
    comment: String,
  }, { timestamps: true });

  /**
   * Comment Model
   */

  var _model = mongoose.model('Comment', _schema);

  /**
   * Public Functions
   */

   var _get = function (authenticated_user, id, cb) {
     if (!authenticated_user) throw new Error('User required.');
     if (!authenticated_user.domain) throw new Error('User domain required.');
     _model.find({domain: authenticated_user.domain, _id: id}, cb);
   };

  var _getAll = function (authenticated_user, event_id, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({domain: authenticated_user.domain, event: event_id}, cb);
  };

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    properties.domain = authenticated_user.domain;
    properties.loggedBy = {}
    properties.loggedBy.name = {first: authenticated_user.name.first, last: authenticated_user.name.last};
    properties.loggedBy.link = authenticated_user._id;
    var c = new _model(properties);
    c.save(cb, function(err){
      console.log(err);
    });
    console.log("done");
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

module.exports = Category;
