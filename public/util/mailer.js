const nodeMailer = require('nodemailer')
const adminEmail = 'onlineclinicvn@gmail.com';
const adminPassword = '123456789abcD@'
const { v4: uuidv4 } = require('uuid');

const sendMailAppointment = (email, content) => {
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
        to: `${email}`,
        subject: 'INFORMATION ABOUT APPOINTMENT',
        text: content
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
        subject: 'INFORMATION ABOUT MEDICAL RECORD',
        text: contentMail
    };
    transporter.sendMail(mailOptions)
}
module.exports = {
    sendMailAppointment: sendMailAppointment,
    sendMailMedicalRecord: sendMailMedicalRecord
}