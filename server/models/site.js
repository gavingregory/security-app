var mongoose = require('mongoose');


// schema
var siteSchema = new Schema({
    name: String,
    type: String,
    size: Number,
    address: { addressSchema },
    contacts [ contactSchema ]
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });

var contactSchema = new Schema ({
    name_first: String,
    name_last: String,
    phone: Number,
    email: String,
    Notes: String,
    }, {_id: false }
);

var addressSchema = new Schema ({
    address_number: Number,
    address_street: String,
    address_district: String,
    address_county: String,
    address_city: String,
    address_country: String,
    address_pc_zip: String,
}, {_id: false });

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
