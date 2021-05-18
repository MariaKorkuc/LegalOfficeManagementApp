const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema({
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
}, { strict: false, timestamps: true });


const DocumentSchema = new Schema({
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


module.exports = mongoose.model('Document', DocumentSchema);