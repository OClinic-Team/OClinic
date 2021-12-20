const nodeMailer = require('nodemailer')
const adminEmail = 'onlineclinicvn@gmail.com';
const adminPassword = '123456789abcD@'
const { v4: uuidv4 } = require('uuid');

const sendMailAppointment = (emailDoctor, emailPatient, link) => {
    var transporter = nodeMailer.createTransport({
        // config mail server
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
const sendMailMedicalRecord = (emailPatient, contentMail) => {
    var transporter = nodeMailer.createTransport({
        // config mail server
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
        to: `${emailPatient}`,
        subject: 'INFORMATION ABOUT APPOINTMENT',
        text: contentMail
    };
    return transporter.sendMail(mailOptions)
}
module.exports = {
    sendMailAppointment: sendMailAppointment,
    sendMailMedicalRecord: sendMailMedicalRecord
}