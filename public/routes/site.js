const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const datLichController = require('../app/controllers/SendEmailController')


router.get('/timkiem', siteController.search);
//router.post('/send-email', emailController.sendMail);
router.get('/send', datLichController.sendMailAppointment);
// router.get('/logout', siteController.logout);
router.get('/', siteController.home);



// router.post('/send-email', emailController.sendMail)
module.exports = router;