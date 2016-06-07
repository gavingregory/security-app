var mongoose = require('mongoose'),
  contactSchema = require('./contact'),
  Site = require('./site'),
  Schema = mongoose.Schema;

// schema
var customerSchema = new Schema({
    name: {type: String, required: true},
    company: {type: String, required: true},
    contacts: [ contactSchema ],
    organisation: {type: Schema.Types.ObjectId, ref: 'Organisation', required: true }
    //sites: [ { type: ObjectId, ref: 'Site' } ],
})

module.exports
// pre save validation
customerSchema.pre('save', function (next) {

next();
});

module.exports = mongoose.model('Customer', customerSchema);
