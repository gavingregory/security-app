var mongoose = require('mongoose'),
  contactSchema = require('./schemas/contact'),
  commentSchema = require('./schemas/comment'),
  Schema = mongoose.Schema;

var Event = function () {

  /**
   * Event Schema
   */

  /*
  * Options:
  *
  */
  eventSchema.statics.getEvents = function (cb, option) {
    return this.model('Event').find({}, cb);
  }

  eventSchema.statics.getEvent = function (user, id, cb) {
    return this.model('Event').find({'_id': id}, cb);
  }

module.exports = mongoose.model('Event', eventSchema);
  var _schema = new Schema({
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

  var _getAll = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({organisation: authenticated_user.domain}, cb);
  };

  var _create = function (authenticated_user, properties, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    properties.organisation = authenticated_user.domain;
    var c = new _model(properties);
    c.save(cb);
  };

  /**
   * Module Export API
   */

  return {
    schema: _schema,
    model: _model,
    getAll: _getAll,
    create: _create
  };

}();

module.exports = Event;
