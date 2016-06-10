var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var License = function () {

  /**
   * License Schema
   */
  var _schema = new Schema({
    organisation: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
  }, { timestamps: true });

  /**
   * Customer Model
   */
  var _model = mongoose.model('License', _schema);

  /**
  * Public Functions
  */

  var _getAll = function (authenticated_user, cb) {
    if (!authenticated_user) throw new Error('User required.');
    if (!authenticated_user.domain) throw new Error('User domain required.');
    _model.find({organisation: authenticated_user.domain}, cb);
  };

  /**
   * Module Export API
   */
  return {
    model: _model,
    schema: _schema,
    getAll: _getAll,
  };

}();

module.exports = License;
