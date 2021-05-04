'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const customAlphabet = require("nanoid").customAlphabet;
const idGenerator = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 5);
const dateFormat = require('dateformat');


var AttachmentSchema = new Schema({
    displayName: {
        type: String,
        required: 'Name is required'
    },
    link: {
        type: String,
        required: 'Link is required'
    }
}, { strict: false });

var DocumentSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\w{8}$/.test(v);
            },
            message: 'Name is not valid!, Pattern("^\w{8}$")'
        },
        required: 'Case name is required'
    },
    type: {
        type: String,
        enum: {
            values: ['type1', 'type2'],
            message: '{VALUE} is not supported'
          },
        required: 'Type of case is required'
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    modificationDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    attachments: [AttachmentSchema]
}, { strict: false });


// DocumentSchema.pre('save', function(callback) {
//     var new_doc = this;
//     new_doc.id = idGenerator();

//     callback();
// });

module.exports = mongoose.model('Documents', DocumentSchema);
module.exports = mongoose.model('Attachments', AttachmentSchema);