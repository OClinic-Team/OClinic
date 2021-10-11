const express = require('express');
const router = express.Router();
const authenticated = require('../app/middlewares/auth');
const addschedulecontroller = require('../app/controllers/AddScheduleController');

router.get('/create', authenticated, addschedulecontroller.create);

module.exports = router;