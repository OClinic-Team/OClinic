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
            if (req.body.date === '') {
                res.send('<script> window.location.href = "/addschedule/create"; alert("Bạn chưa chọn ngày làm việc !!!");</script>');
            } else {
                addschedule.findOne({ date: req.body.date }, (err, data) => {
                    if (data) {
                        res.send('<script> window.location.href = "/addschedule/create"; alert("Bạn đã đăng ký ngày này rồi !!!");</script>');
                    } else {

                        const schedule = new addschedule(req.body);
                        schedule.save();

                        res.send('<script> window.location.href = "/addschedule/create"; alert("Bạn đã đăng ký thành công !!!");</script>');
                    }

                })
            }


        }
        //xem lich lam viec
        // daysToString() {
        //     let today = new Date()
        //     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        //     return (daysOfWeek[today.getDay()] + ':' + today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear());
        // }
    viewschedule(req, res, next) {
        // let today = new Date()
        // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // console.log(daysOfWeek[today.getDay()] + ':' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear())
        // var strToDate = new Date(daysOfWeek[today.getDay()] + ':' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear())
        // console.log(strToDate.getDay() + ':' + strToDate.getDate() + '/' + (strToDate.getMonth() + 1) + '/' + strToDate.getFullYear())
        // console.log(strToDate)
        const a = new Date('Sunday:12/12/2021');
        console.log(a);
        addschedule.find({ doctorId: req.session.authUser.Id })
            .then((data) => {
                res.render('addschedule/show', {
                    schedule: mutileMongooseToObject(data),
                })
            })
    }
}

module.exports = new AddScheduleController;