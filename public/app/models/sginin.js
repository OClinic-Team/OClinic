const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accounts_patient = new Schema(
    {
     ID: {type: String, required: true},
     Name: {type: String,  required: true},
     ImageURL: {type: String,  required: true},
     Email: {type: String,  required: true},
    },
    {
      timestamps: true
    });

    module.exports = mongoose.model('accounts_patient', accounts_patient);