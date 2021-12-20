const Schedule = require('../models/addschedule');
const Appointment = require('../models/Appointment');
// const { mutileMongooseToObject } = require('../../util/mongoose');
// const { mongooseToObject } = require('../../util/mongoose');
// const { accounts } = require('./AccountController');
// const { medicalrecords } = require('./MedicalRecordController');
const mailer = require('../../util/mailer');
const { v4: uuidv4 } = require('uuid');
//const alert = require('alert');
class SendEmailController {
    async sendMailAppointment(req, res) {

            const link = 'https://oonlineclinic.herokuapp.com/videocall/' + uuidv4();
            const dataDoctorId = req.query.doctorId;
            const dataPatientId = req.session.authUser.Id;
            const dataEmailDoctor = req.query.doctorEmail
            const dataEmailPatient = req.session.authUser.Email;
            const dataDoctorName = req.query.doctorName;
            const dataPatientName = req.session.authUser.Name;
            const time = req.query.time;

            if (req.query.time == null) {
                res.send('<script> window.location.href = "/accounts"; alert("Bạn chưa chọn thời gian cho cuộc hẹn");</script>');

            } else {
                try {
                    const data = new Appointment({
                        doctorId: dataDoctorId,
                        patientId: dataPatientId,
                        doctorName: dataDoctorName,
                        patientName: dataPatientName,
                        doctorEmail: dataEmailDoctor,
                        patientEmail: dataEmailPatient,
                        roomLink: link,
                        time: req.query.time,
                    })
                    data.save();
                    // Lấy data truyền lên từ form phía client
                    // Thực hiện gửi email
                    await mailer.sendMailAppointment(dataEmailDoctor, dataEmailPatient, link);
                    // sau khi đặt lịch thành công thì khung giờ được đặt lịch hẹn của bác sĩ sẽ bị ẩn
                    const inforTime = time.split(' ');
                    const update = null;
                    switch (inforTime[0]) {
                        case '7h00-8h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time1: false });
                            break;
                        case '8h00-9h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time2: false });
                            break;
                        case '9h00-10h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time3: false });
                            break;
                        case '10h00-11h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time4: false });
                            break;
                        case '13h00-14h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time5: false });
                            break;
                        case '14h00-15h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time6: false });
                            break;
                        case '15h00-16h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time7: false });
                            break;
                        case '16h00-17h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time8: false });
                            break;
                        case '18h00-19h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time9: false });
                            break;
                        case '19h00-20h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time10: false });
                            break;
                        case '20h00-21h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time11: false });
                            break;
                        case '21h00-22h00':
                            await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time12: false });
                            break;
                    }
                    // sau khi đặt lịch sẽ sửa data schedule thành false-- > đã có người đặt lịch true-- > lịch đăng kí và chưa có người đặt null-- > không đăng kí
                    // console.log('Thời gian bắt đầu:' + inforTime[0] + '\n' + 'ngay hen:' + inforTime[1] + '\n DoctorId:' + dataDoctorId + '\n Time:' + req.query.time);
                    // Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, update)
                    // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
                    res.send('<script> window.location.href = "/me/appointment"; alert("Bạn đã đặt lịch thành công !!!");</script>');

                } catch (error) {
                    // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
                    console.log(error)
                    res.send('<script> window.location.href = "/accounts"; alert("Đang xãy ra lỗi trong lúc đặt lịch !!!");</script>');
                }
            }
        }
        // async sendMailMedicalRecord(req,res){
        //   const emailPatient = req.session.authUser.Email;

    //   try {
    //     // Lấy data truyền lên từ form phía client
    //     // Thực hiện gửi email
    //     await mailer.sendMailAppointment(emailPatient);
    //     // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
    //     res.render('home')
    //   } catch (error) {
    //     // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
    //     console.log(error)
    //     res.send('Lịch đăng ký không được xác nhận. Vui lòng Đăng Ký Lại !!!')
    //   }
    // }
}
module.exports = new SendEmailController;