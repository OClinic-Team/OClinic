const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const account_patient = require('./app/models/AccountPatient');
const account_doctor = require('./app/models/AccountDoctor');
const account_admin = require('./app/models/AccountAdmin');
const accounts = require('./app/models/Account')
const { mutileMongooseToObject } = require('./util/mongoose');
const { mongooseToObject } = require('./util/mongoose');
require('./app/passport');
const route = require('./routes');
const db = require('./config/db');
const path = require('path');
const port = process.env.PORT || 3000;
//Middleware
const SortMiddleware = require('./app/middlewares/SoftMiddleware');
const auth = require('./app/middlewares/auth');
//room video-call
const stream = require('./app/room_module/stream');

//webRTC
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true,
});


//auth google login
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

const queryPatientAcc = async function(userId) {
    const data = await account_patient.findOne({ Id: userId })
    return data;
};
const queryAdminAcc = async function(req, res, userId) {
    const data = await account_admin.findOne({ Id: userId })
    if (data === null) {
        const newAdminAcc = new account_admin({
            Id: req.user.id,
            Name: req.user.displayName,
            ImageURL: req.user.photos[0].value,
            Email: req.user.emails[0].value,
            Permission: '2',
        })
        await newAdminAcc.save();
        return newAdminAcc;
    }
    return data;
}
const queryDoctorAcc = async function(req, res, userId) {
    const data = await account_doctor.findOne({ Id: userId })
    if (data === null) {
        const newDoctorAcc = new account_doctor({
            Id: req.user.id,
            Name: req.user.displayName,
            ImageURL: req.user.photos[0].value,
            Sex: '',
            Address: '',
            Email: req.user.emails[0].value,
            Department: '',
            Description: '',
            Practicing_certificate: '',
            Permission: '1',
        })
        await newDoctorAcc.save();
        console.log(newDoctorAcc)
        return newDoctorAcc;
    }
    return data;

};

const queryAcc = async function(req, res) {
    const data = await accounts.findOne({ Id: req.user.id })
    if (data === null) {
        const newAcc = new accounts({
            Id: req.user.id,
            Email: req.user.emails[0].value,
            RoleName: 'patient',
        })
        newAcc.save();
        const newPatientAcc = new account_patient({
            Id: req.user.id,
            Name: req.user.displayName,
            ImageURL: req.user.photos[0].value,
            Sex: '',
            Address: '',
            Email: req.user.emails[0].value,
            Permission: '0',
        })
        await newPatientAcc.save();

        return newAcc;
    } else {

        return data;
    }
    // })
}

app.use(passport.initialize());
app.use(passport.session());
app.use(SortMiddleware);
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    async function(req, res, next) {
        const account = await queryAcc(req, res);
        console.log(account);
        if (account.RoleName === 'patient') {
            req.session.authUser = await queryPatientAcc(req.user.id);
        } else {
            if (account.RoleName === 'doctor') {
                req.session.authUser = await queryDoctorAcc(req, res, req.user.id);
                console.log(req.session.authUser.Schedule);
            } else {
                req.session.authUser = await queryAdminAcc(req, res, req.user.id);
                console.log(req.session.authUser.Permission);
            }
        }
        req.session.isAuthenticated = true;
        req.session.token = req.user.token;
        var redirectionUrl = req.session.redirectUrl || '/';
        res.redirect(redirectionUrl);
    });




//set data cho res.locals su dung cho .hdb
app.use(async function(req, res, next) {
    if (req.session.isAuthenticated === null) {
        req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
});


//video call
const { v4: uuidv4 } = require('uuid');

app.use('/peerjs', peerServer);
app.set('view engine', 'ejs');

app.get('/videocall', (req, res) => {
    res.redirect(`/videocall/${uuidv4()}`);
});
app.get('/createVideocall', (req, res) => {
    res.send(`http:/localhost:3000/videocall/${uuidv4()}`);

});

app.get('/videocall/:room', auth, (req, res) => {
    console.log(req.params.id)
    res.render('room', { layout: false, roomId: req.params.room });
});

io.sockets.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        console.log(userId)
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
        socket.on('message', (message, userId) => {
            io.to(roomId).emit('createMessage', message, userId);
        });
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});





// app.get('/datlichhen', (req, res) => {
//     res.render('datlichhen');
// });
app.get('/logout', function(req, res) {
    req.session = null;
    req.logout();
    res.redirect('/');

});

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
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                };
                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`;
            },
            sections: function(name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            },
            'if_eq': function(a, b, opts) {
                if (a == b) {
                    return opts.fn(this);
                } else {
                    return opts.inverse(this);
                }
            }
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