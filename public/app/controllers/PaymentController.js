const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Appointment = require('../models/Appointment');
const stripe = require("stripe")('sk_test_51Kj29fGNuWrPJtOZqO7IMWfS8dD9AxG9JkAy6YxV3lGT8fl85UL8GZHQOpuFDeQ5Szb6sBrrqf1KspeKWDSrQqyI00HksRNfH8');

class PaymentController {
    async payment(req, res, next) {
        Appointment.findOne({ roomLink: `https://oonlineclinic.herokuapp.com/videocall/${req.params.roomLink}` }, (err, data) => {
            if (data !== null) {
                if (data.paid == false) {
                    res.render('charge', { roomLink: req.params.roomLink })

                } else {
                    res.render('room', { layout: false, roomId: req.params.room, userName: req.session.authUser.Name }); // If appointment paid -> next
                    // next();

                }
            } else {
                res.send('No data');
            }
        })
    }
    async payment2(req, res) {
        // Moreover you can take more details from user 
        // like Address, Name, etc from form 
        await stripe.customers.create({
                email: req.body.email,
                source: req.body.stripeToken,
                name: req.body.name,
            })
            .then((customer) => {
                return stripe.charges.create({
                    amount: '200000',
                    description: 'Thanh toán phí khám bệnh',
                    currency: 'VND',
                    customer: customer.id
                });
            })
            .catch((err) => {
                res.send(err.raw.message) // If some error occurs 
            });
        const room = `https: //oonlineclinic.herokuapp.com/videocall/${req.body.roomLink}`;
        await Appointment.findOneAndUpdate({ roomLink: room }, { paid: true });
        res.render('room', { layout: false, roomId: req.params.room, userName: req.session.authUser.Name }); // If no error occurs 
    }
}
module.exports = new PaymentController;