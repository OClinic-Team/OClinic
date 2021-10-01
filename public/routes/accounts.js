const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');


router.get('/create', accountController.create);

router.post('/store', accountController.store);

router.get('/:id/edit', accountController.edit);

router.post('/handle-form-action', accountController.handFormAction);

router.put('/:id', accountController.update);

router.patch('/:id/restore', accountController.restore);

router.delete('/:id/xoa-that', accountController.destroyThat);

router.delete('/:id', accountController.destroy);

router.get('/:slug', accountController.show);

router.get('/', accountController.accounts);

module.exports = router;
