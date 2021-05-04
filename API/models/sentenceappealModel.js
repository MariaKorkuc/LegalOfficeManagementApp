'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const customAlphabet = require("nanoid").customAlphabet;
const idGenerator = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 5);


var SentenceAppealSchema = new Schema({
    sentence: {
        type: String,
        required: 'Sentence is required'
    },
    type: {
        type: String,
        enum: {
            values: ['sentence', 'appeal'],
            message: '{VALUE} is not supported'
          },
        required: 'Sentence or appeal?'
    },
    status: {
        type: String,
        enum: {
            values: ['Open', 'Closed'],
            message: '{VALUE} is not supported'
          },
        default: 'Open'
    },
    date: {
        type: Date,
        required: 'Date is required'
    },
    modificationDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
}, { strict: false });


// SentenceAppealSchema.pre('save', function(callback) {
//     var new_sa = this;
//     new_sa.id = idGenerator();

//     callback();
// });

module.exports = mongoose.model('SentenceAppeals', SentenceAppealSchema);