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
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//Middleware
const SortMiddleware = require('./app/middlewares/SoftMiddleware');
const auth = require('./app/middlewares/auth');
//blog
var bodyParser = require('body-parser')
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
const AWS = require('aws-sdk');
// const s3Object = new AWS.S3({
//    accessKeyId : config.aws_access_key_id,
//    secretAccessKey : config.aws_secret_access_key,
//    region: config.aws_region,
// });
// var FroalaEditor = require('./wysiwyg-editor-node-sdk/lib/froalaEditor.js');

app.use(express.static(__dirname + '/'));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/get_signature', function (req, res) {
    var configs = {
        // The name of your bucket.
        bucket: 'oclinic',

        // S3 region. If you are using the default us-east-1, it this can be ignored.
        region: 'ap-southeast-1',

        // The folder where to upload the images.
        keyStart: 'oclinic',

        // File access.
        acl: 'public-read',

        // AWS keys.
        accessKey: AKIA4VNGP5AL72EU2ICD,
        secretKey: J759DY4yBdbRNDw2tfpYOoYGlWqZpJRDiM
    }

    var s3Hash = FroalaEditor.S3.getHash(configs);

    res.send(s3Hash);
});
//room video-call
//webRTC
let server = require('http').Server(app);
let io = require('socket.io')(server);
io.sockets.on('connection', (socket) => {
    socket.on('setSocketId', function (data) {
        //config data user join in room{id,name,room}
        const userName = data.name;
        const userId = socket.id;
        const userRoom = data.room;
        //add user 
        addUser(userId, userName, userRoom);
        //query user
        getUsers(userRoom);
    });
    socket.on('join-room', (roomId, userId) => {
        console.log(userId)
        console.log(socket.id)
        socket.join(roomId);
        const user = getUser(socket.id)
        socket.to(roomId).broadcast.emit('user-connected', userId, user);
        console.log(userId)
        socket.on('message', (message) => {
            const user = getUser(socket.id);
            console.log(user.id)
            io.to(roomId).emit('createMessage', message, user.name);
        });
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
            deleteUser(socket.id)
        });
    });
});


io.of('/stream').on('connection', (socket) => {
    socket.on('subscribe', (data) => {
        //subscribe/join a room
        socket.join(data.room);
        socket.join(data.socketId);

        //Inform other members in the room of new user's arrival
        if (socket.adapter.rooms[data.room].length > 1) {
            socket.to(data.room).emit('new user', { socketId: data.socketId });
        }
    });


    socket.on('newUserStart', (data) => {
        socket.to(data.to).emit('newUserStart', { sender: data.sender });
    });


    socket.on('sdp', (data) => {
        socket.to(data.to).emit('sdp', { description: data.description, sender: data.sender });
    });


    socket.on('ice candidates', (data) => {
        socket.to(data.to).emit('ice candidates', { candidate: data.candidate, sender: data.sender });
    });


    socket.on('chat', (data) => {
        socket.to(data.room).emit('chat', { sender: data.sender, msg: data.msg });
    });
});

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

const queryPatientAcc = async function (userId) {
    const data = await account_patient.findOne({ Id: userId })
    return data;
};
const queryAdminAcc = async function (req, res, userId) {
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
const queryDoctorAcc = async function (req, res, userId) {
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

const queryAcc = async function (req, res) {
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
    async function (req, res, next) {
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
        const redirectionUrl = req.session.redirectUrl || '/';
        res.redirect(redirectionUrl);
    });




//set data cho res.locals su dung cho .hdb
app.use(async function (req, res, next) {
    if (req.session.isAuthenticated === null) {
        req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
});
//new video call
function generateRandomString() {
    const crypto = window.crypto || window.msCrypto;
    let array = new Uint32Array(1);

    return crypto.getRandomValues(array);
}

app.get('/new-call-video/', (req, res) => {
    console.log(req.query.room)
    res.render('newRoom', { layout: false });
    // res.redirect(`/payment/${req.params.room}`);
});

//video call
const { v4: uuidv4 } = require('uuid');

app.use('/peerjs', peerServer);
app.set('view engine', 'ejs');

app.get('/videocall', (req, res) => {
    res.redirect(`/videocall/${uuidv4()}`);
});


app.get('/videocall/:room', auth, (req, res) => {
    res.redirect(`/payment/${req.params.room}`);
    // res.render('room', { layout: false, roomId: req.params.room, userName: req.session.authUser.Name });
});

const { addUser, getUser, deleteUser, getUsers } = require('../public/app/middlewares/user')







app.get('/logout', function (req, res) {
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

//blog

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: function (a, b) {
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
                return ` < a href = "?_sort&column=${field}&type=${type}" >
        <
        span class = "${icon}" > < /span> <
        /a>`;
            },
            sections: function (name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            },
            'if_eq': function (a, b, opts) {
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