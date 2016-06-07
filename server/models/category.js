var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var categorySchema = Schema({
    name: String,
    colour: String
});

module.exports = categorySchema;
