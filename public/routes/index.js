const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const accountsRouter = require('./accounts');
// const patientRouter = require('./accountPatient');
const medicalrecordRouter = require('./medicalRecord');
const addscheduleRoute = require('./addschedule');
const accountUserRouter = require('./accountUser')
const profileRouter = require('./profile');
const searchRouter = require('./search')

function route(app) {
    // app.use('/medicalRecord', createsMedicalRecord);
    app.use('/profile', profileRouter);

    app.use('/news', newsRouter);

    app.use('/me', meRouter);

    // app.use('/accountPatient', patientRouter);
    app.use('/search', searchRouter);
    app.use('/medicalRecord', medicalrecordRouter);

    app.use('/accounts', accountsRouter);

    app.use('/addschedule', addscheduleRoute);

    // app.use('/google', accountUserRouter);

    app.use('/', siteRouter);
}

module.exports = route;