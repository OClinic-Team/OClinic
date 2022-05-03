const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Appointment = require('../models/Appointment');
const stripe = require("stripe")('sk_test_51Kj29fGNuWrPJtOZqO7IMWfS8dD9AxG9JkAy6YxV3lGT8fl85UL8GZHQOpuFDeQ5Szb6sBrrqf1KspeKWDSrQqyI00HksRNfH8');

class PaymentController {
    payment(req, res, next) {
        Appointment.findOne({ roomLink: `https://oonlineclinic.herokuapp.com/videocall/${req.params.roomLink}` }, (err, data) => {
            console.log(data)
            console.log(req.params.roomLink)
            if (data) {
                if (data.paid == false) {
                    res.render('charge')
                        //         // res.render(` < script src = "//checkout.stripe.com/v2/checkout.js"; class = "stripe-button";
                        //         //         data-key = "pk_test_51Kj29fGNuWrPJtOZvRKSQ6VQFvIN9mVCQFTmy2r9dAGpliX8yKvJefmepRQ1L4jtxQhutqikJOwbTdrrJ7UJBAej009Y9NTGPz"; 
                        //         //         data-email = "{{lcAuthUser.Email}}"
                        //         //         data-amount = "200000"; data-currency = "VND"; data-name = ${data.patientName}; 
                        //         //         data-description = "Thanh toán cho Online Clinic"; data-locale = "auto"; ></script>`)
                        //         // Moreover you can take more details from user 
                        //         // like Address, Name, etc from form 
                        //     stripe.customers.create({
                        //             email: req.body.stripeEmail,
                        //             source: req.body.stripeToken,
                        //             name: data.patientName,
                        //         })
                        //         .then((customer) => {
                        //             return stripe.charges.create({
                        //                 amount: '200000',
                        //                 description: 'Thanh toán phí khám bệnh',
                        //                 currency: 'USD', //'VND'
                        //                 customer: customer.id
                        //             });
                        //         })
                        //         .then((charge) => {
                        //             Appointment.findOneAndUpdate({ roomLink: `
                        //             https: //oonlineclinic.herokuapp.com/videocall/${req.body.roomLink}` }, { paid: true });
                        //             // res.render(`videocall/${req.body.roomLink}`) // If no error occurs 
                        //             res.render('room', { layout: false, roomId: req.params.room, userName: req.session.authUser.Name }); // If no error occurs 
                        //             console.log('Successful')
                        //         })
                        //         .catch((err) => {
                        //             res.send(err.raw.message) // If some error occurs 
                        //         });
                } else {
                    res.render('room', { layout: false, roomId: req.params.room, userName: req.session.authUser.Name }); // If appointment paid -> next
                    // next();

                }
            } else {
                res.send('No data');
            }
        })

        // async payment1(req, res) {
        //     // Create a PaymentIntent:
        //     await stripe.paymentIntents.create({
        //         amount: 200000,
        //         currency: 'VND',
        //         transfer_group: '{ORDER10}',
        //     });

        //     // Create a Transfer to the connected account (later):
        //     await stripe.transfers.create({
        //         amount: 30000,
        //         currency: 'VND',
        //         destination: 'cus_LRMWJp0AaFQNRO',
        //         // transfer_group: '{ORDER10}',
        //     });

        //     // Create a second Transfer to another connected account (later):
        //     await stripe.transfers.create({
        //         amount: 150000,
        //         currency: 'VND',
        //         destination: 'cus_LPsD6hIVlS5ONY',
        //         // transfer_group: '{ORDER10}',
        //     });
        // }
        // async payment2(req, res) {
        //     const { product } = req.body;
        //     await stripe.checkout.sessions.create({
        //         payment_method_types: ["card"],
        //         line_items: [{
        //             price_data: {
        //                 currency: "inr",
        //                 product_data: {
        //                     name: product.name,
        //                     images: [product.image],
        //                 },
        //                 unit_amount: product.amount * 100,
        //             },
        //             quantity: product.quantity,
        //         }, ],
        //         mode: "payment",
        //         success_url: `${YOUR_DOMAIN}/${product.roonLink}`,
        //         cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        //     });

        //     res.json({ id: stripe.id });
        // };

    }
}
module.exports = new PaymentController;