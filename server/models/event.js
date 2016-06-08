var mongoose = require('mongoose'),
  contactSchema = require('./contact'),
  categorySchema = require('./category'),
  commentSchema = require('./comment'),
  Schema = mongoose.Schema;


  // schema
  var eventSchema = new Schema({
      site: {type: Schema.Types.ObjectId, ref: 'Site', required: true },
      logged_by: { name: String, link: { type: Schema.Types.ObjectId, ref: 'User' }},
      category: { categorySchema },
      comments:  [ { commentSchema } ],
  }, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

  /*
  * Options:
  *
  */
  eventSchema.statics.getEvents = function (cb, option) {

    return this.model('Event').find({}, cb);
  }

  eventSchema.statics.getEvent = function (id, cb) {
    return this.model('Event').find({'_id': id}, cb);
  }

module.exports = mongoose.model('Event', eventSchema);
