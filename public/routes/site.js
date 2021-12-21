const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const sendMailController = require('../app/controllers/SendEmailController')
const checkPatient = require('../app/middlewares/checkPatient'); //kiem tra co phai benh nhan khong
const authentication = require('../app/middlewares/auth')
router.get('/sendLinkRoom', authentication, checkPatient, sendMailController.sendMailAppointment);
router.post('/sendMedicalRecords', authentication, checkPatient, sendMailController.sendMailMedicalRecord);
router.get('/', siteController.home);
module.exports = router;