const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const datLichController = require('../app/controllers/SendEmailController')

const authentication = require('../app/middlewares/auth')
router.get('/send', authentication, datLichController.sendMailAppointment);
router.get('/', siteController.home);
module.exports = router;