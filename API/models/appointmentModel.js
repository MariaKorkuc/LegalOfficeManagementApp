'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: 'Date is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
}, { strict: false });

module.exports = mongoose.model('Appointments', AppointmentSchema);