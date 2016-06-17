var mongoose = require('mongoose')
  , Schema   = mongoose.Schema;

var addressSchema = new Schema ({
  raw: String,
  lat: Number,
  lng: Number,
  number: String,
  street: String,
  town: String,
  county: String,
  city: String,
  country: String,
  pc_zip: String,
});

module.exports = addressSchema;
