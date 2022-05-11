const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Blog = require('../models/blog')
class blogController {
    createBlog(req, res, next) {
        res.render('blog/create')
    }

    blogs(req, res, next) {
        Blog.find({})
            .then((blogs) => {
                res.render('blog/blogs', {
                    blogs: mutileMongooseToObject(blogs),
                });
            })
            .catch(next);
    }

    store(req, res, next) {
        const blog = new Blog(req.body);
        blog
            .save()
            .then(() => res.redirect('/blog'))
            .catch((error) => { });
    }

    show(req, res, next) {
        res.setHeader("Content-Type", "text/html")
        Blog.findOne({ _id: req.params.id })
            .then((blog) => {
                res.render('blog/show', {
                    blog: mongooseToObject(blog),
                });
            })
            .catch(next);
    }

    edit(req, res, next) {
        Blog.findById(req.params.id)
            .then((blog) =>
                res.render('blog/edit', { blog: mongooseToObject(blog) }),
            )
            .catch(next);
    }

    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/blog'))
            .catch(next);
    }
}
module.exports = new blogController();