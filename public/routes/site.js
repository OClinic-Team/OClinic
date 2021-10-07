const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const datLichController = require('../app/controllers/datLichController')
const emailController = require('../app/controllers/emailController')


router.get('/search', siteController.search);
router.post('/send-email', emailController.sendMail);
// router.get('/lichhen', datLichController.datLich)
router.get('/', siteController.home);

 

// router.post('/send-email', emailController.sendMail)
module.exports = router;