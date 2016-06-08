var mongoose = require('mongoose'),
addressSchema = require('./schemas/address'),
contactSchema = require('./schemas/contact'),
Schema = mongoose.Schema;

var orgSchema = new Schema({
    name: String,
    license: Number,
    address: { addressSchema },
    contacts: [ contactSchema ]
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

module.exports = mongoose.model('Organisation', orgSchema);
