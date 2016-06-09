var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventCategory = function () {

  /**
   * EventCategory Schema
   */

  var _schema = Schema({
    name: {type: String, required: true},
    colour: {type: String, required: true}
  });

  /**
   * EventCategory Model
   */

  var _model = mongoose.model('EventCategory', categorySchema);

  /**
   * Public Functions
   */

  /* functions go here */

  /**
   * Module Export API
   */

  return {
    schema: _schema,
    model: _model
  };

}();

module.exports = EventCategory;
