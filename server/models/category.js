var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var categorySchema = Schema({
    name: String,
    colour: String,
}, { _id: false });

module.exports = mongoose.model('Category', categorySchema);
