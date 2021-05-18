const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JudgeSchema = new Schema({
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
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Judge', JudgeSchema);