const Account = require('../models/Account');
const Account_Patient = require('../models/AccountPatient');
// const Account_Doctor = require('../models/AccountDoctor');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
// const AddingSchedule = require('../models/addschedule')
const accounts_patient = require('../models/AccountPatient');
const accounts_doctor = require('../models/AccountDoctor');
class AccountController {
    //[GET] /account/:slug
    // accounts2(req, res, next) {
    //     // var tmp = new Date();
    //     // tmp.setDate(tmp.getDate() + 1);
    //     // console.log(tmp)
    //     accounts_doctor.aggregate([{
    //                 $lookup: {
    //                     from: "addschedules",
    //                     as: "Doctor_Schedule",
    //                     localField: "Id",
    //                     foreignField: "doctorId",
    //                     // pipeline: [{
    //                     //         $match: {
    //                     //             'timeWorking': { $gte: tmp },
    //                     //         },
    //                     //     },
    //                     //     {
    //                     //         $sort: {
    //                     //             'timeWorking': 1
    //                     //         },
    //                     //     },
    //                     // ],

    //                 },
    //             },
    //             {
    //                 $unwind: { path: "$Id", preserveNullAndEmptyArrays: true },
    //             },
    //             {
    //                 $match: {
    //                     'Doctor_Schedule.timeWorking': { $gt: new Date() },
    //                 },
    //             },
    //             {
    //                 $sort: {
    //                     'timeWorking': 1
    //                 },
    //             },
    //         ])
    //         .then((accounts => {
    //             console.log(accounts[0])
    //             res.render('accounts', { accounts })
    //         }))
    //         .catch((error) => {
    //             next();
    //             console.log(error)
    //         })
    // }
    accounts(req, res, next) {
            var tmp = new Date();
            tmp.setDate(tmp.getDate() - 1);
            console.log(tmp)
            accounts_doctor.aggregate([{
                    $lookup: {
                        from: "addschedules",
                        let: { user_id: "$Id" },
                        pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [{
                                                $eq: ['$doctorId', "$$user_id"]
                                            },
                                            { $gte: ["$timeWorking", tmp] }

                                        ]
                                    },
                                    'timeWorking': { $gte: tmp },
                                }
                            },
                            {
                                $sort: {
                                    'timeWorking': 1
                                },
                            },
                        ],
                        as: "Doctor_Schedule",
                    },
                }, ])
                .then((accounts => {
                    console.log(accounts[2])
                    res.render('accounts', { accounts })
                }))
                .catch((error) => {
                    next();
                    console.log(error)
                })
        }
        //{ $gte: tmp }
        //{ path: "$Doctor", preserveNullAndEmptyArrays: true }
    show(req, res, next) {
            Account.findOne({ slug: req.params.slug })
                .then((account) => {
                    res.render('accounts/show', {
                        account: mongooseToObject(account),
                    });
                })
                .catch(next);
        }
        //[GET] accounts/create
    create(req, res, next) {
            res.render('accounts/create');
        }
        //[POST] accounts/store
    store(req, res, next) {
        req.body.image = `https: //img.youtube.com/vi/${req.body.video}/sddefault.jpg`
        const account = new Account(req.body);
        account
            .save()
            .then(() => res.redirect('/accounts'))
            .catch((error) => {});
    }
    edit(req, res) {
        Account.findById(req.params.id, (err, account) => {
            if (account.RoleName == 'patient') {
                res.render('accounts/edit', { accountPatient: mongooseToObject(account) })
            } else {
                res.redirect(`/accounts/${account.Id}/edit/admin`)
            }
        })
    }
    editAdmin(req, res, next) {
            accounts_doctor.findOne({ Id: req.params.Id })
                .then((editprofile) => {
                    res.render('editprofileAdmin', {
                        profileDoctor: mongooseToObject(editprofile),
                    });
                })
                .catch(next)
        }
        //[PUT] accounts/:id
    async update(req, res, next) {
            if (req.body.RoleName == 'doctor') {
                const data = await Account_Patient.findOneAndDelete({ Id: req.body.Id });
            }
            await Account.updateOne({ Id: req.body.Id }, req.body)
                .then(() => res.redirect('/me/stored/accounts'))
                .catch(next);
        }
        //[DELETE] accounts/:id
    destroy(req, res, next) {
            Account.delete({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //[DELETE] accounts/:id/xoa-that
    destroyThat(req, res, next) {
        Account.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] accounts/:id/restore
    restore(req, res, next) {
            Account.restore({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //[POST]
    handFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Account.delete({ _id: { $in: req.body.accountIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ mesage: 'hanh dong khong hop le' })
        }
    }

}

module.exports = new AccountController();