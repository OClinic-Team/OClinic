const nodeMailer = require('nodemailer')
const adminEmail = 'huynhbaquoctrung077@gmail.com';
const adminPassword = '0906108abcD'
const { v4: uuidv4 } = require('uuid');
const link = 'https://oonlineclinic.herokuapp.com/videocall/' + uuidv4();

const sendMailAppointment = (emailDoctor, emailPatient, ) => {
    var transporter = nodeMailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    });

    var mailOptions = {
        from: adminEmail,
        to: `${emailDoctor} , ${emailPatient}`,
        subject: 'Đây là đài phát thanh truyền hình Việt Nam',
        text: link + "/br" + "ádsadsadsad",
    };
    return transporter.sendMail(mailOptions)
}
module.exports = {
    sendMailAppointment: sendMailAppointment,
}