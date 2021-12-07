const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const datLichController = require('../app/controllers/SendEmailController')

const authentication = require('../app/middlewares/auth')
router.get('/timkiem', siteController.search);
router.get('/send', authentication, datLichController.sendMailAppointment);
router.get('/', siteController.home);



// router.post('/send-email', emailController.sendMail)
module.exports = router;