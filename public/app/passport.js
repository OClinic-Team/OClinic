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
        callbackURL: "http://localhost:3000/google/callback"
    },
    //https://oonlineclinic.herokuapp.com/google/callback //return callback to website
    //http://localhost:3000/google/callback // return callback to localhost
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);

    }

    // (profile, done) => {
    //     if (profile.id) {
    //         Account.findOne({ Id: profile.id })
    //             .then((existingUser) => {
    //                 if (existingUser) {
    //                     done(null, existingUser);
    //                 } else {
    //                     new Account({
    //                             Id: profile.id,
    //                             Email: profile.emails[0].value,
    //                             RoleName: 'patient',
    //                         })
    //                         .save()
    //                         .then(user => done(null, user));
    //                 }
    //             })
    //     }
    // function(accessToken, refreshToken, profile, done) {
    //     //user the profile info to check if the user is registered in db
    //     // User.findOrCreate({ exampleId: profile.id }, function(done, user) {
    //     // console.log(accessToken);
    //     return done(null, profile);

    // }


));


// app.get('/api/current_user', (req, res) => {
//     res.send(req.user);
// });