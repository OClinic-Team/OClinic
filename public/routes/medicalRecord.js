const express = require('express');
const router = express.Router();
const authenticated = require('../app/middlewares/auth');
const medicalRecordController = require('../app/controllers/MedicalRecordController');
const checkDoctor = require('../app/middlewares/checkDoctor'); // kiem tra co phai bac si khong
const checkPatient = require('../app/middlewares/checkPatient'); //kiem tra co phai benh nhan khong
const checkAdmin = require('../app/middlewares/checkAdmin'); //kiem tra co phai Admin khong


router.post('/storeMedicalRecord', authenticated, checkDoctor, medicalRecordController.storeMedicalRecord); // chua hoan thien
router.get('/create/:Id', authenticated, checkDoctor, medicalRecordController.createMR); //tạo medical record khi bam vao nut Tạo hồ sơ bệnh án ở trang xem lịch hẹn
// router.get('/create', authenticated, medicalRecordController.create);

router.post('/handle-form-action', authenticated, medicalRecordController.handFormAction); // xóa ảo medical record

router.patch('/:id/restore', authenticated, medicalRecordController.restore); // lay lại medical record da xóa ảo

router.delete('/:id/xoa-that', authenticated, medicalRecordController.destroyThat); // xóa medical record vinh vien

router.delete('/:id', authenticated, medicalRecordController.destroy); // xoa that ???

router.get('/:id', authenticated, medicalRecordController.show); // show medical record (chua lam)


module.exports = router;