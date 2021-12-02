// const Account = require('../models/Account');
// const MedicalRecord = require('../models/MedicalRecord');
// const { mutileMongooseToObject } = require('../../util/mongoose');
// const { mongooseToObject } = require('../../util/mongoose');
// const { accounts } = require('./AccountController');
// const { medicalrecords } = require('./MedicalRecordController');
const mailer = require('../../util/mailer');
class SendEmailController {
  async sendMailAppointment(req, res)  {
    const emailDoctor = req.query.Email;
    const emailPatient = req.session.authUser.Email;
    
    try {
      // Lấy data truyền lên từ form phía client
      // Thực hiện gửi email
      await mailer.sendMailAppointment(emailDoctor,emailPatient);
      // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
      res.render('home')
    } catch (error) {
      // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
      console.log(error)
      res.send('Lịch đăng ký không được xác nhận. Vui lòng Đăng Ký Lại !!!')
    }
  }
  async sendMailMedicalRecord(req,res){
    const emailPatient = req.session.authUser.Email;
    
    try {
      // Lấy data truyền lên từ form phía client
      // Thực hiện gửi email
      await mailer.sendMailAppointment(emailPatient);
      // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
      res.render('home')
    } catch (error) {
      // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
      console.log(error)
      res.send('Lịch đăng ký không được xác nhận. Vui lòng Đăng Ký Lại !!!')
    }
  }
}
module.exports = new SendEmailController;