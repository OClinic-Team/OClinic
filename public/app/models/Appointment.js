const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appointment = new Schema({
    doctorId: { type: String, required: true },
    PatientId: { type: String, required: true },
    doctorEmail: { type: String, required: true },
    patientEmail: { type: String, required: true },
    roomLink: { type: String, required: true },
    date: { type: Date },
    time: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('appointment', appointment);