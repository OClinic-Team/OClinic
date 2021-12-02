const MedicalRecord = require('../models/MedicalRecord');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const mailer = require('../../util/mailer');

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
    store(req, res, next) {
        
            const medicalRecord = new MedicalRecord(req.body);
            medicalRecord
                .save()
                .then(() => res.redirect('/medicalRecord'))
                .catch((error) => {});
        }
        //[POST] /medicalRecord/storeMedicalRecord
        storeMedicalRecord(req, res, next) {

            const medicalRecord = new MedicalRecord(req.body);
            medicalRecord.save();
            // .then(res.redirect("medicalRecord/create"))
            res.send('Medical-Record Saved !');
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
