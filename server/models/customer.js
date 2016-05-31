var mongoose = require('mongoose');

// schema
var Schema = new schema({
    name: String,
    company: String,
    contacts: [ contactSchema ],
    sites: [ _siteId: Schema.types.ObjectId ],
})

var contactSchema = new Schema ({
    name_first: String,
    name_last: String,
    phone: Number,
    email: String,
    notes: String,
    }, {_id: false }
);

// pre save validation
schema.pre('save', function (next) {

next();
});
