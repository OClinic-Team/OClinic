const Doctor_Account = require('../models/AccountDoctor');
const Account = require('../models/Account');
const MedicalRecord = require('../models/MedicalRecord');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { accounts } = require('./AccountController');
const { medicalrecords } = require('./MedicalRecordController');

class MeController {


    //[GET] /datlichhen
    datLich(req, res, next) {
        let accountQuery = Doctor_Account.find({});
        if (req.query.hasOwnProperty('_sort')) {
            accountQuery = accountQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        accountQuery
            .then(accounts => res.render('me/appointment', {
                accounts: mutileMongooseToObject(accounts),
            }))
            .catch(next);
    }

    //Soft 
    handFormAction(req, res, next) {
        switch (req.body.action) {
            case '1':
                //   Account.find({ _id: { $in: req.body.khoa} })
                //   .then(() => res.redirect('back'))
                //   .catch(next);
                res.json(req.body);
                break;
            default:
                res.json({ mesage: 'hanh dong khong hop le' })
        }
    }

    //[GET] stored/account


    // storedAccounts(req, res, next) {
    //     let accountQuery = Account.find({});
    //     if (req.query.hasOwnProperty('_sort')) {
    //         accountQuery = accountQuery.sort({
    //             name: 'asc'
    //         })
    //     }


    //     Promise.all([accountQuery, Account.countDocumentsDeleted()])
    //         .then(([accounts, deleteCount]) =>
    //             res.render('me/stored-accounts', {
    //                 deleteCount,
    //                 accounts: mutileMongooseToObject(accounts),
    //             })
    //         )
    //         .catch(next);
    // }
    //[GET] /me/stored/accounts
    storedAccounts(req, res, next) {
            Account.find({}, function(err, data) {
                if (err) res.send(err)
                res.render('me/stored-accounts', {
                    account: mutileMongooseToObject(data),
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