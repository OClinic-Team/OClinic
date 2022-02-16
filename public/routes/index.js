const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const accountsRouter = require('./accounts');
// const patientRouter = require('./accountPatient');
const medicalrecordRouter = require('./medicalRecord');
const addscheduleRoute = require('./addschedule');
const profileRouter = require('./profile');
const searchRouter = require('./search');


function route(app) {
    // app.use('/medicalRecord', createsMedicalRecord);
    app.use('/profile', profileRouter); //done

    // app.use('/news', newsRouter);//khong tim ra trang

    app.use('/me', meRouter); //done

    // app.use('/accountPatient', patientRouter);
    app.use('/search', searchRouter); //done
    app.use('/medicalRecord', medicalrecordRouter); //done

    app.use('/accounts', accountsRouter); //done

    app.use('/addschedule', addscheduleRoute); //done
    app.use('/sendEmail', siteRouter) //done
    app.use('/', siteRouter);
}

module.exports = route;