const account_patient = require('../models/AccountPatient');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const passport = require('passport');
const express = require('express');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const cookieSession = require('cookie-session');
require('../passport');
class AccountUserController {

    // [GET] / MedicalRecord / create
    // create(req, res, next) {
    //         res.render('medicalRecords/create');
    //     }
    //create update function
    varifyGgAccount(req, res, next) {
        passport.authenticate('google', { scope: ['profile', 'email'] })
    }
    authenticated(req, res, next) {
        passport.authenticate('google', { failureRedirect: '/fail' }),
            function(req, res) {
                const accounts_patient = new account_patient({
                    Id: req.user.id,
                    Name: req.user.displayName,
                    ImageURL: req.user.photos[0].value,
                    Email: req.user.emails[0].value
                })
                accounts_patient.save();
                // req.cookieSession.
                req.session.isAuthenticated = true;
                req.session.authUser = accounts_patient;
                //dang nhap thanh cong chuyen ve home
                res.redirect('/');
            };
    }
}


module.exports = new AccountUserController;