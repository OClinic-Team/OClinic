const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accounts_doctor = new Schema({
    Id: { type: String, required: true },
    Name: { type: String, required: true },
    ImageURL: { type: String },
    Phone: { type: String },
    Sex: { type: String },
    Address: { type: String },
    Age: { type: String },
    Email: { type: String, required: true },
    Department: { type: String },
    Practicing_certificate: { type: String },
    Permission: { type: String },

}, {
    timestamps: true
});

module.exports = mongoose.model('accounts_doctor', accounts_doctor);