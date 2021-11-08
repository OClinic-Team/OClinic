const express = require('express');
const router = express.Router();

const profileController = require('../app/controllers/profileController');

router.post('/editInformation',profileController.saveprofile);    
router.get('/:Id/edit',profileController.editprofile);
router.get('/:Id', profileController.profile);

module.exports = router;