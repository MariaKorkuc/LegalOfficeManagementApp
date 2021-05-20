const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SentenceAppealSchema = new Schema({
    sentence: {
        type: String,
        required: 'Sentence is required'
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: {
            values: ['SENTENCE', 'APPEAL'],
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
    }
}, { strict: false, timestamps: true });

module.exports = mongoose.model('SentenceAppeal', SentenceAppealSchema);