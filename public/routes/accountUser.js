const express = require('express');
const router = express.Router();

const accountUserController = require('../app/controllers/AccountUserController');


router.get('/callback/:slug', accountUserController.authenticated);
router.use('/', accountUserController.varifyGgAccount);


module.exports = router