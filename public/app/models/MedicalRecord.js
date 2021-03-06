const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const MedicalRecord = new Schema({
    Doctor_Id: { type: String, require: true },
    Patient_Id: { type: String, require: true },
    namePatient: { type: String, minLength: 1, maxLength: 255 },
    nameDoctor: { type: String, minLength: 1, maxLength: 255 },
    age: { type: String },
    address: { type: String },
    symptom: { type: String },
    phone: { type: String },
    diagnose: { type: String },
    prescription: { type: String },
    note: { type: String },
    date: { type: String },
    slug: { type: String, slug: 'date', unique: true },
}, {
    timestamps: true,
}, );

//add plugin
mongoose.plugin(slug);
MedicalRecord.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Medical-Record', MedicalRecord);