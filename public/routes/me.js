const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController.js');

// newsController.index();
router.get('/stored/accounts', meController.storedAccounts);
router.post('/handle-form-action', meController.handFormAction);

router.get('/trash/accounts', meController.trashAccounts);
router.get('/stored/medical-record', meController.storedMedicalRecord);
router.get('/trash/medical-record', meController.trashMedicalRecord);
router.get('/datlichhen', meController.datLich);
module.exports = router;
