const Account_Doctor = require('../models/AccountDoctor');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class SearchControllers {

    // [GET] / MedicalRecord / create

    searchDepartment(req, res, next) {
        // if (req.query.Department === '0') {
        //     alert('Mời Bạn chọn khoa trước khi tìm');
        //     res.redirect('back');
        // }

        Account_Doctor.aggregate([{
                    $match: {
                        Department: req.query.Department
                    }
                },
                {
                    $lookup: {
                        from: "addschedules",
                        localField: "Id",
                        foreignField: "doctorId",
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