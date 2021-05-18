const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const { schema: ContactDetailSchema } = require('./contactDetailsModel');

const LegalEntitySchema = new Schema({
    roleInCase: {
        type: String,
        required: 'Enter the type',
        enum:{
            values: ['WITNESS', 'DEFENDANT'],
            message: '{VALUE} is not supported'
        }
    },
    decription: {
        type: String,
        required: 'descrition is required'
    },
    contactDetail: ContactDetailSchema
}, { strict: false, timestamps: true });

module.exports = mongoose.model('LegalEntity', LegalEntitySchema);