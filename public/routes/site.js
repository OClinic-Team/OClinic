const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const emailController = require('../app/controllers/emailController')


router.get('/timkiem', siteController.search);
router.post('/send-email', emailController.sendMail);
// router.get('/logout', siteController.logout);
router.get('/', siteController.home);



// router.post('/send-email', emailController.sendMail)
module.exports = router;