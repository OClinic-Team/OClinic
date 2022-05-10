const express = require('express');
const router = express.Router();
const blog = require('../app/controllers/blogController')
const auth = require('../app/middlewares/auth');
const checkAdmin = require('../app/middlewares/checkAdmin');

router.post('/store', blog.store);

router.get('/create', blog.createBlog);

router.get('/:id', blog.show);

module.exports = router;
