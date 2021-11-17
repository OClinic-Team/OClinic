const express = require('express');
const router = express.Router();

const patientController = require('../app/controllers/PatientController');


router.get('/sginin', patientController.sginin)
router.post('/danki', patientController.danki)
router.get('/login', patientController.login);
router.post('/login', patientController.login);



module.exports = router;