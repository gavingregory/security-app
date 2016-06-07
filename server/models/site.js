var mongoose = require('mongoose');
var addressSchema = require('./address');
var contactSchema = require('./contact'),

Schema   = mongoose.Schema;
// schema
var siteSchema = new Schema({
    name: String,
    type: String,
    size: Number,
    address: { addressSchema },
    contacts: [ contactSchema ],
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', required: true }
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

// virtuals
siteSchema.virtual('address.full').get(function() {
  return [this.address_number, this.address_street, this.address_district, this.address_county, this.address_city, this.address_pc_zip, this.address_country];
})

// pre save validation
siteSchema.pre('save', function (next) {

next();
});

module.exports = mongoose.model('Site', siteSchema);
