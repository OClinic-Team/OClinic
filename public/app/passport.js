const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



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
        callbackURL: "https://nodejs-oclinic.herokuapp.com//google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        //user the profile info to check if the user is registered in db
        // User.findOrCreate({ exampleId: profile.id }, function(done, user) {
        return done(null, profile);

    }));


// app.get('/api/current_user', (req, res) => {
//     res.send(req.user);
// });