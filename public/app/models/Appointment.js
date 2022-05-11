const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appointment = new Schema({
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    doctorName: { type: String },
    patientName: { type: String },
    doctorEmail: { type: String, required: true },
    patientEmail: { type: String, required: true },
    roomLink: { type: String, required: true },
    paid: { type: Boolean, default: false },
    dateOfAppointment: { type: String },
    time: { type: String },
    slug: { type: String, slug: 'roomLink', unique: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('appointment', appointment);