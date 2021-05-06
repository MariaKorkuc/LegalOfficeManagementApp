'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactDetailsSchema = new Schema({
    email: {
        type: String,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
        type: String,
        required: 'Enter the address'
    },
    phone: {
        type: String,
        required: 'Enter the phone number'
    },
    photo: {
        type: Buffer,
    },
    type: {
        type: String,
        required: 'Enter the type',
        enum:{
            values: ['PERSON', 'COMPANY'],
            message: '{VALUE} is not supported'
        }
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    typeOfActivity: {
        type: String,
    },
    companyName: {
        type: String,
    },
}, { strict: false });

module.exports = mongoose.model('Contact Details', ContactDetailsSchema);