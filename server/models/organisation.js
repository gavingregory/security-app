var mongoose = require('mongoose')
  , addressSchema = require('./schemas/address')
  , contactSchema = require('./schemas/contact')
  , customerSchema = require('./customer').schema
  , Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, required: true },
  //license: {type: Number, required: true },
  //address: { addressSchema },
  //contacts: [ contactSchema ],
  customers: [{type: Schema.Types.ObjectId, ref: 'Customer'}]
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

module.exports = {
  model: mongoose.model('Organisation', schema),
  schema: schema
}
