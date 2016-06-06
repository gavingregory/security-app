
var contactSchema = new Schema ({
    name_first: String,
    name_last: String,
    phone: Number,
    email: String,
    Notes: String,
    }, {_id: false }
);

module.exports = contactSchema;
