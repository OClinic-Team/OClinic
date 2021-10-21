const express = require('express');
const router = express.Router();

const addschedulecontroller = require('../app/controllers/AddScheduleController');

router.get('/create',addschedulecontroller.create);
router.post('/add',addschedulecontroller.add);
module.exports = router;