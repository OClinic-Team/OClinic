const accounts_patient = require('../models/AccountPatient');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class profileController {

    profile(req, res, next) {
        accounts_patient.findOne({ Id: req.params.Id })
            .then(profile => {
                res.render('profile', { profile: mongooseToObject(profile) });
            })
            .catch(next)
    }
    editprofile(req, res, next) {
        accounts_patient.findOne({ Id: req.params.Id })
            .then(editprofile => {
                res.render('editprofile', { profile: mongooseToObject(editprofile) });
            })
            .catch(next)

    }
    saveprofile(req, res, next) {
        accounts_patient.findOneAndReplace({ Id: req.body.Id }, {
            Id: req.body.Id,
            Name: req.body.Name,
            ImageURL: req.body.ImageURL,
            Sex: req.body.Sex,
            Address: req.body.Address,
            Phone: req.body.Phone,
            Age: req.body.Age,
            Email: req.body.Email
        })

        //  accounts_patient.findOne({Id :req.body.Id,Phone:req.body.Phone} )
        .then(() => res.redirect(`/profile/${req.body.Id}`))
            .catch(next);


    }
}

module.exports = new profileController();