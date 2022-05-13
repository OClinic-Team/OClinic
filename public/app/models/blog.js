const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const createBlog = new Schema({
    title: { type: String, required: true},
    ImageURL: {type: String},
    description: {type: String},
    content: {type: String},
    slug: { type: String, slug: 'date', unique: true },
})
mongoose.plugin(slug);
createBlog.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('blog', createBlog)