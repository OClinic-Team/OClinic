const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchControllers');


router.get('/', searchController.searchDepartment);


module.exports = router