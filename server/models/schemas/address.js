var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var addressSchema = new Schema ({
  number: Number,
  street: String,
  district: String,
  county: String,
  city: String,
  country: String,
  pc_zip: String,
});

module.exports = addressSchema;
