var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var categorySchema = Schema({
    name: {type: String, required: true},
    colour: {type: String, required: true}
});

module.exports = mongoose.model('EventCategory', categorySchema);
