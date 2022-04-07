const express = require('express');
const router = express.Router();
const authenticated = require('../app/middlewares/auth');
const paymentController = require('../app/controllers/PaymentController');

router.post('/', authenticated, paymentController.payment);
// router.post('/checkout')
module.exports = router;