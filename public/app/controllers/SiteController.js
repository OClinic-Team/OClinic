const Account = require('../models/Account');
const { mutileMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //Trang Chu
    home(req, res, next) {
        Account.find({})
            .then((accounts) => {
                res.render('home', {
                    accounts: mutileMongooseToObject(accounts),
                });
            })
            .catch(next);
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
    logout(req, res) {
        req.session = null;
        req.logout();
        //logout --> home
        res.redirect('/');
    }

}

module.exports = new SiteController();