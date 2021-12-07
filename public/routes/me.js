const express = require('express');
const router = express.Router();
const authenticated = require('../app/middlewares/auth');
const meController = require('../app/controllers/MeController.js');

// newsController.index();
router.get('/stored/accounts', authenticated, meController.storedAccounts);
router.post('/handle-form-action', authenticated, meController.handFormAction);
router.get('accounts/:Id/edit', meController.editUser);
router.get('/trash/accounts', authenticated, meController.trashAccounts);
router.get('/stored/medical-record', authenticated, meController.storedMedicalRecord);
router.get('/trash/medical-record', authenticated, meController.trashMedicalRecord);
router.get('/appointment', authenticated, meController.datLich);
module.exports = router;