
var addressSchema = new Schema ({
    address_number: Number,
    address_street: String,
    address_district: String,
    address_county: String,
    address_city: String,
    address_country: String,
    address_pc_zip: String,
}, {_id: false });

module.exports = addressSchema;
