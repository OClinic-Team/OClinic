const express = require('express');
const router = express.Router();
const authenticated = require('../app/middlewares/auth');
const accountController = require('../app/controllers/AccountController');

router.get('/create', authenticated, accountController.create);

router.post('/store', authenticated, accountController.store);

router.get('/:id/edit', authenticated, accountController.edit);

router.post('/handle-form-action', authenticated, accountController.handFormAction);

router.put('/:id', authenticated, accountController.update);

router.patch('/:id/restore', authenticated, accountController.restore);

router.delete('/:id/xoa-that', authenticated, accountController.destroyThat);

router.delete('/:id', authenticated, accountController.destroy);

router.get('/:slug', authenticated, accountController.show);

router.get('/', accountController.accounts);

module.exports = router;