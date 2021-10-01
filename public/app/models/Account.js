const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Account = new Schema(
  {
    name: { type: String, minLength: 1, maxLength: 255 },
    description: { type: String },
    khoa: { type: String },
    time: { type: String },
    chungNhan: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);
//add plugin
mongoose.plugin(slug);
Account.plugin(mongooseDelete, {
  deleteAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Account', Account);
