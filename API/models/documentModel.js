'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const customAlphabet = require("nanoid").customAlphabet;
// const idGenerator = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 5);
// const dateFormat = require('dateformat');


var AttachmentSchema = new Schema({
    displayName: {
        type: String,
        required: 'Name is required'
    },
    textVector: {
        type: String,
        required: 'Link is required'
    },
    type: {
        type: String,
        enum: {
            values: ['pdf'],
            message: '{VALUE} is not supported'
          },
        required: 'Type of case is required'
    },
    link: {
        type: String,
        required: 'Link is required'
    }
}, { strict: false });

var DocumentSchema = new Schema({
    name: {
        type: String,
        required: 'Case name is required'
    },
    description: {
        type: String
    },
    modificationUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    attachments: [AttachmentSchema]
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Documents', DocumentSchema);
module.exports = mongoose.model('Attachments', AttachmentSchema);