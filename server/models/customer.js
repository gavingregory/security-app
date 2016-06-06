var mongoose = require('mongoose'),
  contactSchema = require('./contact'),
  Site = require('./site'),
  Schema = mongoose.Schema;

// schema
var customerSchema = new Schema({
    name: String,
    company: String,
    contacts: [ contactSchema ],
    //sites: [ { type: ObjectId, ref: 'Site' } ],
})

module.exports
// pre save validation
customerSchema.pre('save', function (next) {

next();
});

module.exports = mongoose.model('Customer', customerSchema);
