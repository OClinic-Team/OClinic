const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController.js');
const auth = require('../app/middlewares/auth');
const checkDoctor = require('../app/middlewares/checkDoctor'); // kiem tra co phai bac si khong
const checkPatient = require('../app/middlewares/checkPatient'); //kiem tra co phai benh nhan khong
const checkAdmin = require('../app/middlewares/checkAdmin'); //kiem tra co phai Admin khong
// newsController.index();
router.get('/stored/accounts', auth, checkAdmin, meController.storedAccounts); //quan ly tai khoan

router.get('/trash/blogs', meController.trashBlogs); // thùng rac chứa acc bi xoa tam thoi
// router.post('/handle-form-action', auth, meController.handFormAction); // nut tim kiem của  ...
// router.get('accounts/:Id/edit', meController.editUser); // bỏ vì dư khong  dùng tới
router.get('/trash/accounts', auth, checkAdmin, meController.trashAccounts); // thùng rac chứa acc bi xoa tam thoi
router.get('/stored/medical-record', auth, meController.storedMedicalRecord); // dường truyền xem medical record (chưa hoàn thành)

router.get('/stored/blogs', meController.storedBlogs); // dường truyền xem medical record (chưa hoàn thành)


router.get('/trash/medical-record', auth, meController.trashMedicalRecord); //dường truyền xem  medical record  đã bị xóa ảo (chưa hoàn thành)
router.get('/appointment', auth, checkPatient || checkDoctor, meController.xemLichHen); //đường truyền show cac lich hen dang co(bac si va benh nha)
module.exports = router;