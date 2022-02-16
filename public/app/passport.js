const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Account = require('../app/models/Account')


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // User.findById(id)
    //     .then(user => {
    done(null, user);
    // })
});
passport.use(new GoogleStrategy({
        clientID: '1044360178044-m8dmf3ou6d0vdb9cuaiodudfn67ce5f5.apps.googleusercontent.com',
        clientSecret: 'LKtBVKiujlp-Tbar-UawBdxK',
        callbackURL: "https://oonlineclinic.herokuapp.com/google/callback"
    },
    //https://oonlineclinic.herokuapp.com/google/callback //return callback to website
    //http://localhost:3000/google/callback // return callback to localhost
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);

    }
))