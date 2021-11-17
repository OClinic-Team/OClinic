const account_patient = require('../models/AccountPatient')
module.exports = function(req, res, next) {
    account_patient.findOne({ Id: req.user.id }, (err, data) => {      
        if (err) {        
            console.log(err)      
        } else {  
            var check_firstTime = false;   
            if (data === null) {          
                check_firstTime = true;
                data = new account_patient({            
                    Id: req.user.id,
                    Name: req.user.displayName,
                    ImageURL: req.user.photos[0].value,
                    Sex: '',
                    Address: '',
                    Email: req.user.emails[0].value,
                          
                })          
                data.save();               
            }        
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