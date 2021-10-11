const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accounts_patient = new Schema({
    Id: { type: String, required: true },
    Name: { type: String, required: true },
    ImageURL: { type: String },
    Email: { type: String, required: true },
    // roles: [{ role: "patient", db: "patient" }]
}, {
    timestamps: true
});

module.exports = mongoose.model('accounts_patient', accounts_patient);