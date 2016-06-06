var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var commentSchema = Schema({
    logged_by: { String, { type: ObjectId, ref: 'User' }},
    comment: String,
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

module.exports = mongoose.model('Comment', commentSchema);
