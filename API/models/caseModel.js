'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const customAlphabet = require("nanoid").customAlphabet;


var CaseSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\w{8}$/.test(v);
            },
            message: 'Name is not valid!, Pattern("^\w{8}$")'
        },
        required: 'Case name is required',
        unique: true
    },
    type: {
        type: String,
        enum: {
            values: ['type1', 'type2'],
            message: '{VALUE} is not supported'
          },
        required: 'Type of case is required'
    },
    status: {
        type: String,
        enum: {
            values: ['Open', 'Closed', 'Reopened'],
            message: '{VALUE} is not supported'
          },
        default: 'Open'
    },
    startDate: {
        type: Date,
        required: 'Start date is required'
    },
    endDate: {
        type: Date
    },
    modificationDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
}, { strict: false });


// CaseSchema.pre('save', function(callback) {
//     var new_case = this;
//     new_case.id = idGenerator();

//     callback();
// });

module.exports = mongoose.model('Cases', CaseSchema);