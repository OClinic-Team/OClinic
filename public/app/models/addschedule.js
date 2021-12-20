const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Addschedule = new Schema({
    doctorId: { type: String, required: true },
    date: { type: String, require: true },
    time1: { type: Boolean, default: null },
    time2: { type: Boolean, default: null },
    time3: { type: Boolean, default: null },
    time4: { type: Boolean, default: null },
    time5: { type: Boolean, default: null },
    time6: { type: Boolean, default: null },
    time7: { type: Boolean, default: null },
    time8: { type: Boolean, default: null },
    time9: { type: Boolean, default: null },
    time10: { type: Boolean, default: null },
    time11: { type: Boolean, default: null },
    time12: { type: Boolean, default: null },
    timeWorking: { type: Date, require: true },
    slug: { type: String, slug: 'date', unique: true },
}, {
    timestamps: true,
}, );
module.exports = mongoose.model('Addschedule', Addschedule);