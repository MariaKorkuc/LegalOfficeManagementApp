'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Double = require('@mongoosejs/double');

var ClientSchema = new Schema({
    pesel: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: 'Pesel number is not valid!, Pattern("^\d+$")'
        },
        required: 'Pesel number is required',
        unique: true
    },
    name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\w{8}$/.test(v);
            },
            message: 'Name is not valid!, Pattern("^\w{8}$")'
        },
        required: 'Client name is required',
    },
    bill: {
        type: Double,
        default: 0.0
    },
    payments: {
        type: Double,
        default: 0.0
    },
    decription: {
        type: String
    },
    isActiveClient: {
        type: Boolean
    },
    historyOfAppointments: [Date]
}, { strict: false });

module.exports = mongoose.model('Clients', ClientSchema);