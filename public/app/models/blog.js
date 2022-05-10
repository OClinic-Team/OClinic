const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createBlog = new Schema({
    Id: { type: String, required: true },
    title: { type: String, required: true},
    ImageURL: {type: String},
    content: {type: String},
    haskTag: {type: String}
})
module.exports = mongoose.model('blog', createBlog)