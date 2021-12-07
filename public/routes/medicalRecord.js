const express = require('express');
const router = express.Router();
const authenticated = require('../app/middlewares/auth');
const medicalRecordController = require('../app/controllers/MedicalRecordController');

router.post('/storeMedicalRecord', authenticated, medicalRecordController.storeMedicalRecord);

router.get('/create/:Id', authenticated, medicalRecordController.createMR);

router.get('/create', authenticated, medicalRecordController.create);// ccc

router.post('/handle-form-action', authenticated, medicalRecordController.handFormAction);

router.patch('/:id/restore', authenticated, medicalRecordController.restore);

router.delete('/:id/xoa-that', authenticated, medicalRecordController.destroyThat);

router.delete('/:id', authenticated, medicalRecordController.destroy);

router.get('/:id', authenticated, medicalRecordController.show);


module.exports = router;