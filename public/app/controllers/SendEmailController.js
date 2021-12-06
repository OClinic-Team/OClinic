// const Account = require('../models/Account');
const Appointment = require('../models/Appointment');
// const { mutileMongooseToObject } = require('../../util/mongoose');
// const { mongooseToObject } = require('../../util/mongoose');
// const { accounts } = require('./AccountController');
// const { medicalrecords } = require('./MedicalRecordController');
const mailer = require('../../util/mailer');
const { v4: uuidv4 } = require('uuid');
const link = 'https://oonlineclinic.herokuapp.com/videocall/' + uuidv4();
class SendEmailController {
    async sendMailAppointment(req, res) {
            const dataDoctorId = req.query.doctorId;
            const dataPatientId = req.session.authUser.Id;
            const dataEmailDoctor = req.query.doctorEmail
            const dataEmailPatient = req.session.authUser.Email;

            try {
                const data = new Appointment({
                    doctorId: dataDoctorId,
                    patientId: dataPatientId,
                    doctorEmail: dataEmailDoctor,
                    patientEmail: dataEmailPatient,
                    roomLink: link,
                    date: req.query.date,
                    time: req.query.time,
                })
                data.save();
                let content = dataDoctorId.toString();
                console.log(content);
                // Lấy data truyền lên từ form phía client
                // Thực hiện gửi email
                await mailer.sendMailAppointment(dataEmailDoctor, dataEmailPatient);
                // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
                res.render('home')
            } catch (error) {
                // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
                console.log(error)
                res.send('Lịch đăng ký không được xác nhận. Vui lòng Đăng Ký Lại !!!')
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