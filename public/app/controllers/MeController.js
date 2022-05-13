const Doctor_Account = require('../models/AccountDoctor');
const Appointment = require('../models/Appointment')
const Account = require('../models/Account');
const Blog = require('../models/blog');
const MedicalRecord = require('../models/MedicalRecord');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { accounts } = require('./AccountController');
const { medicalrecords } = require('./MedicalRecordController');

class MeController {



    async xemLichHen(req, res, next) {
        // biet tmp là để chứa ngay dùng cho filter tìm kiếm (lọc các ngày đã qua và chỉ lấy lịch làm việc từ hôm nay trở đi) 
        var tmp = new Date();
        tmp.setDate(tmp.getDate() - 1);
        if (req.session.authUser.Permission == '1') {
            const accountQuery = await Appointment.find({ doctorId: req.session.authUser.Id, dateOfAppointment: { $gte: tmp } }).sort({ dateOfAppointment: -1 })
            if (req.query.hasOwnProperty('_sort')) {
                accountQuery = accountQuery.sort({
                    [req.query.column]: req.query.type
                })
            }
            res.render('me/appointment', {
                doctor: mutileMongooseToObject(accountQuery)
            })


        } else {
            if (req.session.authUser.Permission == '0') {
                const accountQuery = await Appointment.find({ patientId: req.session.authUser.Id, dateOfAppointment: { $gte: tmp } }).sort({ dateOfAppointment: -1 })
                if (req.query.hasOwnProperty('_sort')) {
                    accountQuery = accountQuery.sort({
                        [req.query.column]: req.query.type
                    })
                }
                res.render('me/appointment', {
                    patient: mutileMongooseToObject(accountQuery)
                })
            } else {
                const accountQuery = await Appointment.find({}).sort({ dateOfAppointment: -1 })
                if (req.query.hasOwnProperty('_sort')) {
                    accountQuery = accountQuery.sort({
                        [req.query.column]: req.query.type
                    })
                }
                res.render('me/appointment', {
                    admin: mutileMongooseToObject(accountQuery)
                })
            }

        }


    }

    //Soft (Khong dung toi nen comment)
    // handFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case '1':
    //             //   Account.find({ _id: { $in: req.body.khoa} })
    //             //   .then(() => res.redirect('back'))
    //             //   .catch(next);
    //             res.json(req.body);
    //             break;
    //         default:
    //             res.json({ mesage: 'hanh dong khong hop le' })
    //     }
    // }

    //[GET] /me/stored/accounts
    storedAccounts(req, res, next) {
        Account.find({}, function (err, data) {
            if (err) res.send(err)
            res.render('me/stored-accounts', {
                account: mutileMongooseToObject(data),
            });
        })
    }
    //[GET] /me/stored/blogs
    storedBlogs(req, res, next) {
        Blog.find({}, function (err, data) {
            if (err) res.send(err)
            res.render('me/stored-blogs', {
                blog: mutileMongooseToObject(data),
            });
        })
    }
    //[GET] /accounts/:Id/edit
    editUser(req, res, next) {
        console.log(req.body.Id)
    }


    //[GET] /me/trash/account
    trashAccounts(req, res, next) {
        Account.findDeleted({})
            .then((accounts) =>
                res.render('me/trash-accounts', {
                    accounts: mutileMongooseToObject(accounts),
                }),
            )
            .catch(next);
    }
    //[GET] /me/trash/medical-record
    trashMedicalRecord(req, res, next) {
        MedicalRecord.findDeleted({})
            .then((medicalrecords) =>
                res.render('me/trash-medical-record', {
                    medicalrecords: mutileMongooseToObject(medicalrecords),
                }),
            )
            .catch(next);
    }
    //[GET] /me/trash/account
    trashBlogs(req, res, next) {
        Blog.findDeleted({})
            .then((blogs) =>
                res.render('me/trash-blogs', {
                    blogs: mutileMongooseToObject(blogs),
                }),
            )
            .catch(next);
    }
    //[GET] /me/store/medical-record
    storedMedicalRecord(req, res, next) {
        if (req.session.authUser.Permission === '2') {
            Promise.all([MedicalRecord.find({}), MedicalRecord.countDocumentsDeleted()])
                .then(([medicalrecords, deleteCount]) =>
                    res.render('me/medical-record', {
                        deleteCount,
                        medicalrecords: mutileMongooseToObject(medicalrecords),
                    })
                )
                .catch(next);
        } else {
            if (req.session.authUser.Permission === '1') {
                Promise.all([MedicalRecord.find({ Doctor_Id: req.session.authUser.Id }), MedicalRecord.countDocumentsDeleted()])
                    .then(([medicalrecords, deleteCount]) =>
                        res.render('me/medical-record', {
                            deleteCount,
                            medicalrecords: mutileMongooseToObject(medicalrecords),
                        })
                    )
                    .catch(next);
            } else {
                Promise.all([MedicalRecord.find({ Patient_Id: req.session.authUser.Id }), MedicalRecord.countDocumentsDeleted()])
                    .then(([medicalrecords, deleteCount]) =>
                        res.render('me/medical-record', {
                            deleteCount,
                            medicalrecords: mutileMongooseToObject(medicalrecords),
                        })
                    )
                    .catch(next);
            }
        }
    }
}

module.exports = new MeController();