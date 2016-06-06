var mongoose = require('mongoose'),
  contactSchema = require('./contact'),
  categorySchema = require('./category'),
  commentSchema = require('./comment'),
  Schema = mongoose.Schema;


  // schema
  var eventSchema = new Schema({
      logged_by: { String, { type: ObjectId, ref: 'User' }},
      category: { categorySchema },
      comments:  [ { commentSchema } ],
  }, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

module.exports = mongoose.model('Event', eventSchema);
