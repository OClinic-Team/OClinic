const accounts_patient = require('../models/AccountPatient');
const accounts_doctor = require('../models/AccountDoctor');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class profileController {

    async profile(req, res, next) {
        if (req.session.authUser.Permission === '0') {
            await accounts_patient.findOne({ Id: req.params.Id })
                .then(profile => {
                    res.render('profile', { profilePatient: mongooseToObject(profile) });
                })
                .catch(next)
        } else {
            await accounts_doctor.findOne({ Id: req.params.Id })
                .then(profile => {
                    res.render('profile', { profileDoctor: mongooseToObject(profile) });
                })
                .catch(next)
        }
    }
    async editprofile(req, res, next) {
        if (req.session.authUser.Permission === '0') {
            await accounts_patient.findOne({ Id: req.params.Id })
                .then(editprofile => {
                    res.render('editprofile', { profilePatient: mongooseToObject(editprofile) });
                })
                .catch(next)
        } else {
            await accounts_doctor.findOne({ Id: req.params.Id })
                .then(editprofile => {
                    res.render('editprofile', { profileDoctor: mongooseToObject(editprofile) });
                })
                .catch(next)
        }


    }
    saveprofile(req, res, next) {
        if (req.session.authUser.Permission === '0') {
            accounts_patient.findOneAndReplace({ Id: req.body.Id }, {
                    Id: req.body.Id,
                    Name: req.body.Name,
                    ImageURL: req.body.ImageURL,
                    Sex: req.body.Sex,
                    Address: req.body.Address,
                    Phone: req.body.Phone,
                    Age: req.body.Age,
                    Email: req.body.Email,
                    Permission: '0',
                })
                .then(() => res.redirect(`/profile/${req.body.Id}`))
                .catch(next);
        } else {
            accounts_doctor.findOneAndReplace({ Id: req.body.Id }, {
                    Id: req.body.Id,
                    Name: req.body.Name,
                    ImageURL: req.body.ImageURL,
                    Phone: req.body.Phone,
                    Sex: req.body.Sex,
                    Address: req.body.Address,
                    Age: req.body.Age,
                    Email: req.body.Email,
                    Department: req.body.Department,
                    Description: req.body.Description,
                    Practicing_certificate: req.body.Practicing_certificate,
                    Permission: '1',
                })
                .then(() => res.redirect(`/profile/${req.body.Id}`))
                .catch(next);

        }


    }
}

module.exports = new profileController();