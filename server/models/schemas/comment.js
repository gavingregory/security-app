var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = Schema({
  createdBy: { name: String, user: { type: Schema.Types.ObjectId, ref: 'User' }},
  comment: String,
}, { timestamps: true });
