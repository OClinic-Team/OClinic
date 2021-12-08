const express = require('express');
const router = express.Router();

const addschedulecontroller = require('../app/controllers/AddScheduleController');
const auth = require('../app/middlewares/auth');
const checkDoctor = require('../app/middlewares/checkDoctor');

router.get('/create', auth, checkDoctor, addschedulecontroller.create);
router.post('/add', auth, checkDoctor, addschedulecontroller.add);
module.exports = router;