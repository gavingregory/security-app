var mongoose = require('mongoose')
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact')
  , Schema = mongoose.Schema;

var Site = function () {

  /**
   * Site Schema
   */

  var _schema = new Schema({
    name: String,
    address: { addressSchema },
    contacts: [ contactSchema ],
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', required: true }
  }, { timestamps: true });

  _schema.virtual('address.full').get(function() {
    return [this.address.number, this.address.street, this.address.district, this.address.county, this.address.city, this.address.pc_zip, this.address.country];
  });

  /**
   * Site Model
   */

  var _model = mongoose.model('Site', siteSchema);

  /**
   * Public Functions
   */

  var _getAll = function (authenticated_user, cb, option) {
    return _model.find({domain: authenticated_user.domain}, {name:1, type:1, size:1, address:1, contacts:1}, cb);
  };

  /**
   * Module Export API
   */

  return {
    schema: _schema,
    model: _model,
    getAll: _getAll
  };

}();

module.exports = Site;
