const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Account = new Schema({
    Id: { type: String, require: true },
    Email: { type: String, require: true },
    RoleName: { type: String },
    slug: { type: String, slug: 'Id', unique: true },
}, {
    timestamps: true,
}, );
//add plugin
mongoose.plugin(slug);
Account.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Account', Account);