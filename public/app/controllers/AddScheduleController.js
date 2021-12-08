const addschedule = require('../models/addschedule');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class AddScheduleController {

    //[GET] addschedule/create
    create(req, res, next) {
            res.render('addschedule/create');
        }
        //thêm lịch làm việc
    add(req, res, next) {
            const schedule = new addschedule(req.body);
            schedule.save();

            res.render('home');
        }
        //xem lich lam viec
    viewschedule(req, res, next) {
        addschedule.find({ Id: req.session.authUser.Id })
            .then((data) => {
                res.send(data.json)
            })
    }
}

module.exports = new AddScheduleController;