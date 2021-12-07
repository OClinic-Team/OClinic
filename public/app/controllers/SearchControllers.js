const Account_Doctor = require('../models/AccountDoctor');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class SearchControllers {

    // [GET] / MedicalRecord / create

    searchDepartment(req, res, next) {
        Account_Doctor.aggregate([{
                    $match: {
                        Department: req.query.Department
                    }
                },
                {
                    $lookup: {
                        from: "addschedules",
                        localField: "doctorId",
                        foreignField: "Id",
                        as: "Doctor_Schedule"

                    },
                },
                {
                    $unwind: { path: "$userInfoData", preserveNullAndEmptyArrays: true },
                },
            ])
            .then((accounts => {
                res.render('accounts', { accounts })
            }))
            .catch((error) => {
                console.log(error)
            })
            // account_doctor.find({ Department: req.query.Department })
            //     .then((accounts) => {
            //         res.render('accounts', {
            //             accounts: mutileMongooseToObject(accounts),
            //         });
            //     })
            //     .catch(next);
    }
}


module.exports = new SearchControllers;