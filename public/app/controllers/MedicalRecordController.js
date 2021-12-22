const MedicalRecord = require('../models/MedicalRecord');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const mailer = require('../../util/mailer');
const AccountPatient = require('../models/AccountPatient');

class MedicalRecordController {
    // [GET] / MedicalRecord / create
    // create(req, res, next) {
    //         res.render('medicalRecords/create');
    //     }
    //create update function
    create(req, res, next) {
        MedicalRecord.findById(req.params.id)
            .then((medicalrecords) => {
                res.render('medicalRecords/create', {
                    medicalrecords: mongooseToObject(medicalrecords),
                });
            })
            .catch(next);
    }
    createMR(req, res, next) {
        AccountPatient.aggregate([{
                    $match: {
                        Id: req.params.Id
                    }
                }, {
                    $lookup: {
                        from: "medical-records",
                        localField: "Id",
                        foreignField: "Patient_Id",
                        as: "medical_record"

                    },
                },
                {
                    $unwind: { path: "$userInfoData", preserveNullAndEmptyArrays: true },
                },
            ])
            .then((patient => {
                res.render('medicalRecords/create', { patient })
            }))
            .catch((error) => {
                console.log(error)
            })




    }
    store(req, res, next) {

            const medicalRecord = new MedicalRecord(req.body);
            medicalRecord
                .save()
                .then(() => res.redirect('/medicalRecord'))
                .catch((error) => {});
        }
        //[POST] /medicalRecord/storeMedicalRecord (button save)
    async storeMedicalRecord(req, res, next) {
            let x = new Date();
            let month = x.getMonth() + 1; // biến month = x.getMonth()+1 để lấy tháng đúng với thời gian thực
            // tạo chuỗi chứa thời gian hiện tại
            const time = x.getHours().toString() + ':' + x.getMinutes().toString() + ' ' + x.getDate().toString() + '/' + month + '/' + x.getFullYear().toString();
            const medicalRecord = new MedicalRecord({
                Doctor_Id: req.session.authUser.Id,
                Patient_Id: req.body.patientId,
                namePatient: req.body.namePatient,
                nameDoctor: req.session.authUser.Name,
                age: req.body.age,
                address: req.body.address,
                symptom: req.body.symptom,
                phone: req.body.phone,
                diagnose: req.body.diagnose,
                prescription: req.body.prescription,
                note: req.body.note,
                date: time,
            });
            await medicalRecord.save();

            res.redirect('/me/stored/medical-record')
        }
        //[GET] /MedicalRecord/:id
    show(req, res, next) {
            MedicalRecord.findById(req.params.id)
                .then((medicalrecords) => {
                    res.render('medicalRecords/show', {
                        medicalrecords: mongooseToObject(medicalrecords),
                    });
                })
                .catch(next);
        }
        //[DELETE] medicalRecord/:id
    destroy(req, res, next) {
            MedicalRecord.delete({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //[DELETE] medicalRecord/:id/xoa-that
    destroyThat(req, res, next) {
        MedicalRecord.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    restore(req, res, next) {
            MedicalRecord.restore({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //[POST]
    handFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                MedicalRecord.delete({ _id: { $in: req.body.medicalRecordIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ mesage: 'hanh dong khong hop le' })
        }
    }
}


module.exports = new MedicalRecordController();