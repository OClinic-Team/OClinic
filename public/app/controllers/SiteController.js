const Account = require('../models/Account');
const { mutileMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //Trang Chu
    home(req, res, next) {
        var tmp = new Date();
        tmp.setDate(tmp.getDate() - 1);
        console.log(tmp)
        Account.find({})
            .then((accounts) => {
                res.render('home', {
                    accounts: mutileMongooseToObject(accounts),
                });
            })
            .catch(next);
    }

    //[GET] /search
    search(req, res, next) {
            // res.json(req.query.Khoa);
            Account.find({ khoa: req.query.Khoa })

            .then((accounts) => {
                    res.render('bacsitheokhoa', {
                        accounts: mutileMongooseToObject(accounts),
                    });
                })
                .catch(next);
            //
            // var khoa = req.query.Khoa
            // var data = Account.filter(function(item){
            //     return item.Khoa === khoa;
            // });
            // res.render('bacsitheokhoa',{
            //     accounts: data
            // });
            //     Account.find({ khoa: req.query.khoa })
            //         .then((account) => {
            //             res.render('accounts/show', {
            //             account: mutileMongooseToObject(account),
            //         });
            //     })
            //   .catch(next);
        }
        // logout(req, res) {
        //     req.session = null;
        //     req.logout();
        //     //logout --> home
        //     res.redirect('/');
        // }

}

module.exports = new SiteController();