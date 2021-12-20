const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const sendMailController = require('../app/controllers/SendEmailController')

const authentication = require('../app/middlewares/auth')
router.get('/sendLinkRoom', authentication, sendMailController.sendMailAppointment);
router.get('/sendMedicalRecord', authentication, sendMailController.sendMailMedicalRecord);
router.get('/', siteController.home);
module.exports = router;