const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Addschedule = new Schema(
    {
        date: { type: Date },
        time_start: { type: String },
        time_end: { type: String },
        date1: { type: Date },
        time_start1: { type: String },
        time_end1: { type: String },
        date2: { type: Date },
        time_start2: { type: String },
        time_end2: { type: String },
        date3: { type: Date },
        time_start3: { type: String },
        time_end3: { type: String },
        date4: { type: Date },
        time_start4: { type: String },
        time_end4: { type: String },
        date5: { type: Date },
        time_start5: { type: String },
        time_end5: { type: String },
        slug: { type: String, slug: 'date', unique: true },      
    }, 
    {
        timestamps: true,
    }, );
module.exports = mongoose.model('Addschedule', Addschedule);