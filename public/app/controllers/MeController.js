const Account = require('../models/Account');
const MedicalRecord = require('../models/MedicalRecord');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { accounts } = require('./AccountController');
const { medicalrecords } = require('./MedicalRecordController');

class MeController {
    //[GET] stored/account
    storedAccounts(req, res, next) {
            Promise.all([Account.find({}), Account.countDocumentsDeleted()])
                .then(([accounts, deleteCount]) =>
                    res.render('me/stored-accounts', {
                        deleteCount,
                        accounts: mutileMongooseToObject(accounts),
                    })
                )
                .catch(next);
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
        //[GET] /me/store/medical-record
    storedMedicalRecord(req, res, next) {
        Promise.all([MedicalRecord.find({}), MedicalRecord.countDocumentsDeleted()])
            .then(([medicalrecords, deleteCount]) =>
                res.render('me/medical-record', {
                    deleteCount,
                    medicalrecords: mutileMongooseToObject(medicalrecords),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();