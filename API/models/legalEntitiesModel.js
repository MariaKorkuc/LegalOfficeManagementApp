'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LegalEntitiesSchema = new Schema({
    roleInCase: {
        type: String,
        required: 'Role is required'
    },
    typeOfEntity: {
        type: String,
        required: 'Type of entity is required'
    },
    decription: {
        type: String,
        required: 'descrition is required'
    }
}, { strict: false });

module.exports = mongoose.model('Legal Entities', LegalEntitiesSchema);