const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Blog = require('../models/blog')
class blogController {
    createBlog(req, res, next) {
        // Account.find({}, function(err, data) {
        // if (err) res.send(err)
        res.render('blog/create')

        // })
    }

    store(req, res, next) {
        const blog = new Blog(req.body);
        blog
            .save()
            .then(() => res.redirect('/blog/create'))
            .catch((error) => { });
    }

    show(req, res, next) {
        Blog.findOne({ _id: req.params.id })
            .then((blog) => {
                res.render('blog/show', {
                    blog: mongooseToObject(blog),
                });
            })
            .catch(next);
    }
}
module.exports = new blogController();