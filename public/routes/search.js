const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchControllers');


router.get('/:khoa', searchController.searchKhoa);


module.exports = router