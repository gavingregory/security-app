var mongoose = require('mongoose'),
  contactSchema = require('./contact'),
  Site = require('./site'),
  Schema = mongoose.Schema;

// schema
var customerSchema = new Schema({
    name: {type: String, required: true}, /* trading name */
    company: {type: String, required: true}, /* registered company name */
    contacts: [ contactSchema ],
    organisation: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
})

module.exports
// pre save validation
customerSchema.pre('save', function (next) {

next();
});

module.exports = mongoose.model('Customer', customerSchema);
