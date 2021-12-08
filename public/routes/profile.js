const express = require('express');
const router = express.Router();

const profileController = require('../app/controllers/profileController');
const auth = require('../app/middlewares/auth');

router.post('/editInformation', auth, profileController.saveprofile);
router.get('/:Id/edit', auth, profileController.editprofile);
router.get('/:Id', auth, profileController.profile);

module.exports = router;