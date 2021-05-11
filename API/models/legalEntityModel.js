'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LegalEntitySchema = new Schema({
    roleInCase: {
        type: String,
        required: 'Enter the type',
        enum:{
            values: ['PERSON', 'COMPANY'],
            message: '{VALUE} is not supported'
        }
    },
    typeOfEntity: {
        type: String,
        required: 'Enter the type',
        enum:{
            values: ['PERSON', 'COMPANY'],
            message: '{VALUE} is not supported'
        }
    },
    decription: {
        type: String,
        required: 'descrition is required'
    }
}, { strict: false });

module.exports = mongoose.model('Legal Entities', LegalEntitySchema);