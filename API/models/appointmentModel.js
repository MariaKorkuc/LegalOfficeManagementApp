const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: 'Date is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    }
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);