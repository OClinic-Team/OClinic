const addschedule = require('../models/addschedule');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class AddScheduleController {

    //[GET] addschedule/create
    create(req, res, next) {
        res.render('addschedule/create');
    }

    add(req, res, next) {
        const schedule = new addschedule(req.body);
        schedule.save();
        res.render('home');
    }
}

module.exports = new AddScheduleController;