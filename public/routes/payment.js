const express = require('express');
const router = express.Router();
const authenticated = require('../app/middlewares/auth');
const paymentController = require('../app/controllers/PaymentController');

router.get('/:roomLink', authenticated, paymentController.payment);
router.post('/charge', paymentController.payment2)
    // router.post('/checkout')
module.exports = router;