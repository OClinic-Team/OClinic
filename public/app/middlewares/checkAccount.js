const Account = require('../models/Account');
const Account_patient = require('../models/AccountPatient');
module.exports = async function(req, res, next) {
    Account.findOne({ Id: req.user.id }, (err, data) => {      
        if (err) {        
            console.log(err)      
        } else {  
            var check_firstTime = false;
            // const account_patient;
            //kiem tra tai khoang da co trong data Account chua
            // neu chua thi tao data trong Account
            if (data === null) {          
                check_firstTime = true;
                data = new Account({
                    Id: req.user.id,
                    Email: req.user.emails[0].value,
                    RoleName: 'patient',
                })
                data.save(); //luu data vao account
                //sau do tao tai khoan cho benh nhan vi bac si do admin tao. neu khong co trong Account thi` chi co the la benh nhan
                data = new Account_patient({            
                    Id: req.user.id,
                    Name: req.user.displayName,
                    ImageURL: req.user.photos[0].value,
                    Sex: '',
                    Address: '',
                    Email: req.user.emails[0].value,
                          
                })          
                data.save(); //luu data vao account patient           
            }
            //else {
            //     if (data.RoleName == 'doctor') {
            //         Account_patient.findOne({ Id: data.Id }, (err, account_doctor) => {

            //         })

            //     }

            // }    
            //req.cookieSession.         
            req.session.isAuthenticated = true;        
            req.session.authUser = data;        
            req.session.token = req.user.token;      
            res.locals.lcIsAuthenticated = req.session.isAuthenticated;
            res.locals.lcAuthUser = req.session.authUser;  
            //dang nhap thanh cong chuyen ve home
            if (check_firstTime) {

                res.redirect(`/profile/${req.user.id}`); 
            } 
            else {
                res.redirect('/');
            }          
        }
    }); 

}