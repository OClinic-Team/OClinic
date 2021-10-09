const Account = require('../models/Account');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {
  //[GET] /account/:slug
  accounts(req, res, next) {
    Account.find({})
      .then((accounts) => {
        res.render('accounts', {
          accounts: mutileMongooseToObject(accounts),
        });
      })
      .catch(next);
  }

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
    req.body.image = `https://img.youtube.com/vi/${req.body.video}/sddefault.jpg`
    const account = new Account(req.body);
    account
      .save()
      .then(() => res.redirect('/accounts'))
      .catch((error) => {});
  }
  edit(req, res, next) {
    Account.findById(req.params.id)
      .then((account) =>
        res.render('accounts/edit', { account: mongooseToObject(account) }),
      )
      .catch(next);
  }
  //[PUT] accounts/:id
  update(req, res, next) {
    Account.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/accounts'))
      .catch(next);
  }
  //[DELETE] accounts/:id
  destroy(req, res, next) {
    Account.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[DELETE] accounts/:id/xoa-that
  destroyThat(req, res, next) {
    Account.delete({ _id: req.params.id })
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
    switch(req.body.action){
      case 'delete': 
          // Account.delete({ _id: { $in: req.body.accountIds} })
          // .then(() => res.redirect('back'))
          // .catch(next);
          res.json(req.body);
          break;
          case 'alo': 
          // Account.delete({ _id: { $in: req.body.accountIds} })
          // .then(() => res.redirect('back'))
          // .catch(next);
          res.json(req.body);
          break;
      default: res.json({mesage: 'hanh dong khong hop le'})
    }
  }
}

module.exports = new AccountController();
