var mongoose = require('mongoose'),
  contactSchema = require('./schemas/contact'),
  commentSchema = require('./schemas/comment'),
  Schema = mongoose.Schema;

// schema
var eventSchema = new Schema({
  site: {type: Schema.Types.ObjectId, ref: 'Site', required: true },
  logged_by: { name: String, link: { type: Schema.Types.ObjectId, ref: 'User', required: true }},
  category: {type: Schema.Types.ObjectId, ref: 'EventCategory', required: true},
  comments: [{ commentSchema }],
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

/*
* Options:
*
*/
eventSchema.statics.getEvents = function (cb, option) {
  return this.model('Event').find({}, cb);
}

module.exports = mongoose.model('Event', eventSchema);
