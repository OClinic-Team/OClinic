const nodeMailer = require('nodemailer')
// const adminEmail = 'onlineclinicvn@gmail.com';
// const adminPassword = '123456789abcD@'
const { v4: uuidv4 } = require('uuid');
// const link = 'https://oonlineclinic.herokuapp.com/videocall/' + uuidv4();

const sendMailAppointment = (emailDoctor, emailPatient, link) => {
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
        subject: 'INFORMATION ABOUT APPOINTMENT',
        text: link
    };
    return transporter.sendMail(mailOptions)
}
module.exports = {
    sendMailAppointment: sendMailAppointment,
}