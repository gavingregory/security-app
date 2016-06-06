var addressSchema = require('./address');
var contactSchema = require('./contactSchema');

var orgSchema = new Schema({
    name: String,
    license: int,
    address: { addressSchema },
    contacts [ contactSchema ]
}, { autoIndex: true, timestamps: true, timestamps: { createdAt: 'created' , updatedAt: 'updated'} });




var Org = mongoose.model('Site', orgSchema);
