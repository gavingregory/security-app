var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , contactSchema = require('./schemas/contact')
  , addressSchema = require('./schemas/address')

var Event = function () {

  /**
   * Event Schema
   */

  var _commentSchema = new Schema({
      creator: { name: {first: String, last: String}, id: { type: Schema.Types.ObjectId, ref: 'User', required: true }},
      text: { type: String, required: true },
    },
    { timestamps: true }
  );

  var _schema = new Schema({
    domain: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true },
    site: {type: Schema.Types.ObjectId, ref: 'Site', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    comments: [_commentSchema],
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
     _model.find({domain: authenticated_user.domain, _id: id})
     .populate('site')
     //.populate('category', ['name', 'colour', 'description'])
    // .populate('comments', ['comment'])
     .exec(cb);
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
    properties.domain = authenticated_user.domain;
    var e = new _model(properties);
    e.comments[0].creator = {
      id: authenticated_user._id,
      name: authenticated_user.name
    };
    e.save(cb);
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

  var _addComment = function (authenticated_user, event_id, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');

    properties.creator = { name: authenticated_user.name, id: authenticated_user._id };

    _model.findById(event_id, function (err, data) {
      if (err) return res.send(err);
      if (!data) return res.status(codes.not_found).send({message: 'Event not found.'});
      data.comments.push(properties);
      data.save(cb);
    });
  }

  /**
  * Module Export API
  */

  return {
    schema: _schema,
    model: _model,
    get: _get,
    getAll: _getAll,
    create: _create,
    remove: _remove,
    addComment: _addComment
  };

}();

module.exports = Event;
