const express = require('express');
const router = express.Router();

const medicalRecordController = require('../app/controllers/MedicalRecordController');

router.post('/storeMedicalRecord', medicalRecordController.storeMedicalRecord);

router.get('/create', medicalRecordController.create);

router.post('/handle-form-action', medicalRecordController.handFormAction);

router.patch('/:id/restore', medicalRecordController.restore);

router.delete('/:id/xoa-that', medicalRecordController.destroyThat);

router.delete('/:id', medicalRecordController.destroy);

router.get('/:id', medicalRecordController.show);


module.exports = router;