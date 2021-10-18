const account_patient = require('../models/AccountPatient');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class SearchControllers {

    // [GET] / MedicalRecord / create
    searchKhoa(req, res, next) {

        res.json(req.params);
        // Account.find({})
        //   .then((accounts) => {
        //     // res.render('accounts', {
        //     //   accounts: mutileMongooseToObject(accounts),
        //     // });
        //     res.json(req.params);
        //   })
        //   .catch(next);
      }
}


module.exports = new SearchControllers;