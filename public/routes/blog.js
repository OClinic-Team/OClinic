const express = require('express');
const router = express.Router();
const blog = require('../app/controllers/blogController')
const auth = require('../app/middlewares/auth');
const checkAdmin = require('../app/middlewares/checkAdmin');

router.post('/store', blog.store);

router.get('/create', blog.createBlog);

router.get('/edit/:id', blog.edit);

router.put('/update/:id', blog.update);

router.get('/:id', blog.show);

router.get('/', blog.blogs);

module.exports = router;
