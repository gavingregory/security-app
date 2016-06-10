var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = new Schema ({
  name_first: String,
  name_last: String,
  phone: Number,
  email: String,
  Notes: String,
}, { timestamps: true });
