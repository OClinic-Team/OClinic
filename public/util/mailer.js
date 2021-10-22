/**
 * Created by trungquandev.com's author on 18/02/2020.
 * utils/mailer.js
 */
const nodeMailer = require('nodemailer')

// Những thông tin dưới đây các bạn có thể ném nó vào biến môi trường env nhé.
// Vì để demo nên mình để các biến const ở đây.

const adminEmail = 'ntluan2.fb@gmail.com'
const adminPassword = 'Tl19112306'

// Mình sử dụng host của google - gmail
const mailHost = 'smtp.gmail.com'
    // 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587

const sendMail = (subject, htmlContent) => {
    // Khởi tạo một thằng transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    })
    const to = 'ntluan1.fb@gmail.com, doankhang750@gmail.com'
        // const receice = (req, res, next) => {
        //     to = req.session.authUser.Email
        // }
    const options = {
        from: adminEmail, // địa chỉ admin email bạn dùng để gửi
        to: to, // địa chỉ gửi đến
        subject: subject, // Tiêu đề của mail
        html: htmlContent // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
    }

    // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}