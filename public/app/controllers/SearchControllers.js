const account_doctor = require('../models/AccountDoctor');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class SearchControllers {

    // [GET] / MedicalRecord / create

    searchDepartment(req, res, next) {

        account_doctor.find({ Department: req.query.Department })
            .then((accounts) => {
                res.render('accounts', {
                    accounts: mutileMongooseToObject(accounts),
                });
            })
            .catch(next);
    }
}


module.exports = new SearchControllers;