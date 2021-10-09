const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('./passport');
const path = require('path');
const port = process.env.PORT || 3000;
//adsdas
//dsdsdsd
const route = require('./routes');
const db = require('./config/db');

//webRTC
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
const { v4: uuidv4 } = require('uuid');

app.use('/peerjs', peerServer);
app.set('view engine', 'ejs');

app.get('/videocall', (req, res) => {
    res.redirect(`/videocall/${uuidv4()}`);
});

app.get('/videocall/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});
app.get('/datlichhen', (req, res) => {
    res.render('datlichhen');
});
io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('message', (message) => {
            io.to(roomId).emit('createMessage', message, userId);
        });
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});
//test
// app.get('/', (req, res) => {
//     // Account.find({})
//     //   .then((accounts) => {
//     //     res.render('home', {
//     //       accounts: mutileMongooseToObject(accounts),
//     //     });
//     //   })
//     //   .catch(next);
//     res.render('home');
// });
//
//auth google login
const account_patient = require('./app/models/AccountPatient');
const { mutileMongooseToObject } = require('./util/mongoose');
const { mongooseToObject } = require('./util/mongoose');
const { Console } = require('console');
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
app.use(passport.initialize());
app.use(passport.session());


app.get('/after-logout', (req, res) => res.send('sau khi logout ban lam gi'));

app.get('/fail', (req, res) => res.send('dang nhap that bai thi lam gi!!!'));
app.get('/success', isLoggedIn, (req, res) => res.send(`dang nhap thanh cong ID: ${req.user.id} Name: ${req.user.displayName} Email:${req.user.emails[0].value} photo:${req.user.photos[0].value}!!! gio thi lam gi`));
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    function(req, res) {
        const accounts_patient = new account_patient({
            Id: req.user.id,
            Name: req.user.displayName,
            ImageURL: req.user.photos[0].value,
            Email: req.user.emails[0].value
        })
        accounts_patient.save()
            // .then(res.redirect('/success'));
            .then((accounts_patient) => {
                res.render('home', {
                    accounts_patient: mongooseToObject(accounts_patient),
                });
            })
            // Successful authentication, redirect home.
            //xữ lý data base ở đây
            // res.redirect('/success');
            // res.redirect('/')=> chuyen ve home
    });

app.get('/logout', (req, res) => {

        req.session = null;
        req.logout()
            .then(res.redirect('home'))
    })
    //connect to data base
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


//sử dụng middleware để sử lý form.
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cookieParser())

app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: function(a, b) {
                return a + b;
            },
        },
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resource', 'views'));

//route init khoi tao tuyen duong
route(app);

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});