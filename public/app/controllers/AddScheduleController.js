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
                if (req.body.time1 == null && req.body.time2 == null && req.body.time3 == null && req.body.time4 == null && req.body.time5 == null && req.body.time6 == null && req.body.time7 == null && req.body.time8 == null && req.body.time9 == null && req.body.time10 == null && req.body.time11 == null && req.body.time12 == null) {
                    res.send('<script> window.location.href = "/addschedule/create"; alert("Bạn chưa chọn ngày làm việc !!!");</script>');
                } else {
                    addschedule.findOne({ Id: req.body.doctorId, date: req.body.date }, (err, data) => {
                        if (data) {
                            res.send('<script> window.location.href = "/addschedule/create"; alert("Bạn đã đăng ký ngày này rồi !!!");</script>');
                        } else {
                            console.log(req.body.date)
                                // const a = req.body.date;
                            const timeTmp = new Date(req.body.date);
                            console.log(timeTmp);
                            // const schedule = new addschedule(req.body);
                            // schedule.save();
                            const scheduleTmp = new addschedule({
                                doctorId: req.body.doctorId,
                                date: req.body.date,
                                time1: req.body.time1,
                                time2: req.body.time2,
                                time3: req.body.time3,
                                time4: req.body.time4,
                                time5: req.body.time5,
                                time6: req.body.time6,
                                time7: req.body.time7,
                                time8: req.body.time8,
                                time9: req.body.time9,
                                time10: req.body.time10,
                                time11: req.body.time11,
                                time12: req.body.time12,
                                timeWorking: timeTmp,
                            })
                            scheduleTmp.save();

                            res.send('<script> window.location.href = "/addschedule/create"; alert("Bạn đã đăng ký thành công !!!");</script>');
                        }

                    })
                }
            }


        }
        //xem lich lam viec
    viewschedule(req, res, next) {
        // biet tmp là để chứa ngay dùng cho filter tìm kiếm (lọc các ngày đã qua và chỉ lấy lịch làm việc từ hôm nay trở đi) 
        var tmp = new Date();
        tmp.setDate(tmp.getDate() - 1);
        addschedule.find({ doctorId: req.session.authUser.Id, timeWorking: { $gte: tmp } }).sort({ timeWorking: 1 })
            .then((data) => {
                res.render('addschedule/show', {
                    schedule: mutileMongooseToObject(data),
                })
            })
    }
}
module.exports = new AddScheduleController;