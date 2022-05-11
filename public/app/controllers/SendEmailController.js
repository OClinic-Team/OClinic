const Schedule = require('../models/addschedule');
const Appointment = require('../models/Appointment');
const account_Patient = require('../models/AccountPatient');
const mailer = require('../../util/mailer');
const { v4: uuidv4 } = require('uuid');
class SendEmailController {
    async sendMailAppointment(req, res) {
        // link room clinic
        const link = `https://oonlineclinic.herokuapp.com/videocall/` + uuidv4();
        const dataDoctorId = req.query.doctorId;
        const dataPatientId = req.session.authUser.Id;
        const dataEmailDoctor = req.query.doctorEmail
        const dataEmailPatient = req.session.authUser.Email;
        const dataDoctorName = req.query.doctorName;
        const dataPatientName = req.session.authUser.Name;
        const time = req.query.time;
        console.log('query' + req.query);
        // check user choose time for appointment or not
        if (req.query.time == null) {
            res.send('<script> window.location.href = "/accounts"; alert("Bạn chưa chọn thời gian cho cuộc hẹn");</script>');

        } else {
            console.log('query' + req.query.time);
            try {

                const dateTime = req.query.time;
                const dateAppointment = dateTime.split(" ");
                console.log(dateAppointment[1]);
                const dataDateAppointment = new Date(dateAppointment[1])
                const data = new Appointment({
                    doctorId: dataDoctorId,
                    patientId: dataPatientId,
                    doctorName: dataDoctorName,
                    patientName: dataPatientName,
                    doctorEmail: dataEmailDoctor,
                    patientEmail: dataEmailPatient,
                    roomLink: link,
                    paid: false,
                    time: req.query.time,
                    dateOfAppointment: dataDateAppointment,
                })
                console.log(data);
                data.save();

                // config content email for Patient
                const contentForPatient = `Chào ${dataPatientName} \nBạn có 1 cuộc hẹn với Bác Sĩ ${dataDoctorName} vào lúc ${time}\n` +
                    +`Click vào đường dẫn dưới đây để tham gia phòng khám:\n${link}`
                    // config content email for Doctor
                const contentForDoctor = `Chào ${dataDoctorName} \nBạn có 1 cuộc hẹn với Bệnh Nhân ${dataPatientName} vào lúc ${time}\n` +
                    +`Click vào đường dẫn dưới đây để tham gia phòng khám:\n${link}`
                    // Lấy data truyền lên từ form phía client
                    // Thực hiện gửi email cho bệnh nhân
                await mailer.sendMailAppointment(dataEmailPatient, contentForPatient);
                // Thực hiện gửi email cho Bác Sĩ
                await mailer.sendMailAppointment(dataEmailDoctor, contentForDoctor);
                // sau khi đặt lịch thành công thì khung giờ được đặt lịch hẹn của bác sĩ sẽ bị ẩn
                const inforTime = time.split(' ');
                switch (inforTime[0]) {
                    case '7h00-7h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time1: false });
                        break;
                    case '7h30-8h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time2: false });
                        break;
                    case '8h00-8h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time3: false });
                        break;
                    case '8h30-9h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time4: false });
                        break;
                    case '9h00-9h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time5: false });
                        break;
                    case '9h30-10h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time6: false });
                        break;
                    case '10h00-10h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time7: false });
                        break;
                    case '10h30-11h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time8: false });
                        break;
                    case '13h00-13h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time9: false });
                        break;
                    case '13h30-14h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time10: false });
                        break;
                    case '14h00-14h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time11: false });
                        break;
                    case '14h30-15h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time12: false });
                        break;
                    case '15h00-15h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time13: false });
                        break;
                    case '15h30-16h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time14: false });
                        break;
                    case '16h00-16h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time15: false });
                        break;
                    case '16h30-17h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time16: false });
                        break;
                    case '18h00-18h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time17: false });
                        break;
                    case '18h30-19h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time18: false });
                        break;
                    case '19h00-19h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time19: false });
                        break;
                    case '19h30-20h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time20: false });
                        break;
                    case '20h00-20h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time21: false });
                        break;
                    case '20h30-21h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time22: false });
                        break;
                    case '21h00-21h30':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time23: false });
                        break;
                    case '21h30-22h00':
                        await Schedule.findOneAndUpdate({ doctorId: dataDoctorId, date: inforTime[1] }, { time24: false });
                        break;
                }
                // sau khi đặt lịch sẽ sửa data schedule thành false-- > đã có người đặt lịch true-- > lịch đăng kí và chưa có người đặt null-- > không đăng kí
                // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
                res.send('<script> window.location.href = "/me/appointment"; alert("Bạn đã đặt lịch thành công !!!");</script>');

            } catch (error) {
                // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
                console.log(error)
                res.send('<script> window.location.href = "/accounts"; alert("Đang xãy ra lỗi trong lúc đặt lịch !!!");</script>');
            }
        }
    }
    async sendMailMedicalRecord(req, res) {
        // tìm Email bệnh nhân thông qua Id của bệnh nhân
        await account_Patient.findOne({ Id: req.body.patientId }, (err, data) => {
            const emailPatient = data.Email;
            //config content Email for send Medical Record
            const content = `Chào ${req.body.namePatient}!!!\n\nHỒ SƠ BỆNH ÁN\nBác Sĩ Khám: ${req.body.nameDoctor}\n` +
                `Tên Bệnh Nhân: ${req.body.namePatient}\nNgày Khám: ${req.body.date}\nSố điện thoại: ${req.body.phone}\n` +
                `Địa chỉ: ${req.body.address}\nTriệu Chứng: ${req.body.symptom}\nChuẩn Đoán: ${req.body.diagnose}\n` +
                `Đơn thuốc: ${req.body.prescription}\nLời Khuyên: ${req.body.note}`
            try {
                // Lấy data truyền lên từ form phía client
                // Thực hiện gửi email
                mailer.sendMailMedicalRecord(emailPatient, content)
                    // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
                res.send(`<script> window.location.href = "/medicalRecord/${req.body.medicalRecord_id}"; alert("Bạn đã gửi hồ sơ bệnh án cho bệnh nhân !!!");</script>`);
            } catch (error) {
                // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
                console.log(error)
                res.send('Gửi Hồ Sơ Bệnh Án Không Thành Công!!!')
            }
        })
    }
}
module.exports = new SendEmailController;