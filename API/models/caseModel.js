const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const { schema: JudgeSchema } = require('./judgeModel');
const { schema: LegalEntitySchema } = require('./legalEntityModel');
const { schema: SentenceAppealSchema } = require('./sentenceAppealModel');


const CaseSchema = new Schema({
    name: {
        type: String,
        required: 'Case name is required',
        unique: true,
        index: true
    },
    type: {
        type: String,
        enum: {
            values: ['CRIMINAL', 'CIVIL', 'FAMILY'],
            message: '{VALUE} is not supported'
          },
        required: 'Type of case is required'
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: {
            values: ['OPEN', 'CLOSED', 'REOPENED'],
            message: '{VALUE} is not supported'
          },
        default: 'Open'
    },
    startDate: {
        type: Date,
        required: 'Start date is required',
        index: true
    },
    endDate: {
        type: Date,
        index: true
    },
    judges: [JudgeSchema],
    legalEntities: [LegalEntitySchema],
    sentenceAppeals: [SentenceAppealSchema],
    affiliatedClients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
    assignedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }]
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Case', CaseSchema);