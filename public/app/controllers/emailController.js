const mailer = require('../../util/mailer')
const { v4: uuidv4 } = require('uuid');
const link = 'https://oonlineclinic.herokuapp.com/videocall/' + uuidv4();
let sendMail = async(req, res) => {
    try {
        // Lấy data truyền lên từ form phía client
        const { subject, body } = req.body

        // Thực hiện gửi email
        await mailer.sendMail(subject, link)

        // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
        res.redirect('/')
    } catch (error) {
        // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
        console.log(error)
        res.send(error)
    }
}

module.exports = {
    sendMail: sendMail
}