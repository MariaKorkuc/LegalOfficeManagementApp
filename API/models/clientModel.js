const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const { schema: ContactDetailSchema } = require('./contactDetailsModel');


const ClientSchema = new Schema({
    pesel: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{11}/.test(v);
            },
            message: 'Pesel number is not valid!, Pattern("^\d+$")'
        },
        required: 'Pesel number is required',
        unique: true
    },
    name: {
        type: String
    },
    decription: {
        type: String
    },
    isActiveClient: {
        type: Boolean
    },
    contactDetail: ContactDetailSchema
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);