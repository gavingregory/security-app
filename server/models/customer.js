var mongoose = require('mongoose');
var contactSchema = require('./contact.js');

// schema
var Schema = new schema({
    name: String,
    company: String,
    contacts: [ contactSchema ],
    sites: [ _siteId: Schema.types.ObjectId ],
})

// pre save validation
schema.pre('save', function (next) {

next();
});
