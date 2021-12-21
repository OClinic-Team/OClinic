const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController');
const auth = require('../app/middlewares/auth'); //kiểm tra đã đăng nhập hay chưa
const checkDoctor = require('../app/middlewares/checkDoctor'); // kiem tra co phai bac si khong
const checkPatient = require('../app/middlewares/checkPatient'); //kiem tra co phai benh nhan khong
const checkAdmin = require('../app/middlewares/checkAdmin'); //kiem tra co phai Admin khong


// router.get('/create', authenticated, checkAdmin, accountController.create);

// router.post('/store', authenticated, accountController.store); // luu account sau khi bam vao nut submit o trang accounts/create

router.get('/:Id/edit/admin', auth, checkAdmin, accountController.editAdmin);
router.get('/:id/edit', auth, accountController.edit); // chinh sua trang ca nhan

router.post('/handle-form-action', auth, accountController.handFormAction);

router.put('/:id', auth, accountController.update); //update thong tin sau khi chinh sua

router.patch('/:id/restore', auth, accountController.restore); //

router.delete('/:id/xoa-that', auth, accountController.destroyThat);

router.delete('/:id', auth, accountController.destroy);

router.get('/:slug', auth, accountController.show);

router.get('/', accountController.accounts);

module.exports = router;