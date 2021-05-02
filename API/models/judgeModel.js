'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JudgeSchema = new Schema({
    name: {
        type: String,
        required: 'Judge name is required',
    },
    surname: {
        type: String,
        required: 'Judge surname is required',
    },
    court: {
        type: String,
        required: 'Court name is required'
    },
    descripion: {
        type: String
    }
}, { strict: false });

module.exports = mongoose.model('judges', LegalEntitiesSchema);