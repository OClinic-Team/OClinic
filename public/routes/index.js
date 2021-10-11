const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const accountsRouter = require('./accounts');
const patientRouter = require('./accountPatient');
const medicalrecordRouter = require('./medicalRecord');
const addscheduleRoute = require('./addschedule');


function route(app) {
    // app.use('/medicalRecord', createsMedicalRecord);
    app.use('/news', newsRouter);

    app.use('/me', meRouter);

    app.use('/accountPatient', patientRouter);

    app.use('/medicalRecord', medicalrecordRouter);

    app.use('/accounts', accountsRouter);

    app.use('/addschedule', addscheduleRoute);



    app.use('/', siteRouter);
}

module.exports = route;