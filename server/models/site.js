var mongoose = require('mongoose');

var addressSchema = require('./address');
var contactSchema = require('./contactSchema');

// schema
var siteSchema = new Schema({
    name: String,
    type: String,
    size: Number,
    address: { addressSchema },
    contacts [ contactSchema ]
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

var Site = mongoose.model('Site', siteSchema);

// methods
var site = new Site({ type: 'small'});
site.findSimilarTypes(function (err, small_sites)) {
  //return small_sites;
}

// virtuals
siteSchema.virtual('address.full').get(function() {
  return [this.address_number, this.address_street, this.address_district, this.address_county, this.address_city, this.address_pc_zip, this.address_country];
})

// pre save validation
schema.pre('save', function (next) {

next();
});
