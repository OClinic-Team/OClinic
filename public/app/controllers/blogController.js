const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const blog = require('../models/blog')
class blogController{
    createBlog(req, res, next) {
        // Account.find({}, function(err, data) {
            // if (err) res.send(err)
            res.render('me/blogWebsite')
            
        // })
    }
}
module.exports = new blogController();