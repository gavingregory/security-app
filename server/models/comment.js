var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var commentSchema = Schema({
    logged_by: { name: String, link: { type: Schema.Types.ObjectId, ref: 'User' }},
    comment: String,
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

module.exports = commentSchema;
