var mongoose = require('mongoose')
  , Schema   = mongoose.Schema;

var addressSchema = new Schema ({
  lat: Number,
  lng: Number,
  number: Number,
  street: String,
  town: String,
  county: String,
  city: String,
  country: String,
  pc_zip: String,
});

module.exports = addressSchema;
