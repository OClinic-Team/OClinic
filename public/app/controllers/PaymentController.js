const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const stripe = require("stripe")('sk_test_51Kj29fGNuWrPJtOZqO7IMWfS8dD9AxG9JkAy6YxV3lGT8fl85UL8GZHQOpuFDeQ5Szb6sBrrqf1KspeKWDSrQqyI00HksRNfH8');

class PaymentController {
    payment1(req, res) {

        // Moreover you can take more details from user 
        // like Address, Name, etc from form 
        stripe.customers.create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken,
                name: req.session.authUser.name,
                // address: {
                //     line1: 'TC 9/4 Old MES colony',
                //     postal_code: '110092',
                //     city: 'New Delhi',
                //     state: 'Delhi',
                //     country: 'India',
                // }
            })
            .then((customer) => {

                return stripe.charges.create({
                    amount: '200000', // Charing Rs 25 
                    description: 'Thanh toán phí khám bệnh',
                    currency: 'USD',
                    customer: customer.id
                });
            })
            .then((charge) => {
                res.render('') // If no error occurs 
                console.log('Success')
            })
            .catch((err) => {
                res.send(err.raw.message) // If some error occurs 
            });
    }
    async payment(req, res) {
        // Create a PaymentIntent:
        await stripe.paymentIntents.create({
            amount: 200000,
            currency: 'VND',
            transfer_group: '{ORDER10}',
        });

        // Create a Transfer to the connected account (later):
        await stripe.transfers.create({
            amount: 30000,
            currency: 'VND',
            destination: 'cus_LRMWJp0AaFQNRO',
            // transfer_group: '{ORDER10}',
        });

        // Create a second Transfer to another connected account (later):
        await stripe.transfers.create({
            amount: 150000,
            currency: 'VND',
            destination: 'cus_LPsD6hIVlS5ONY',
            // transfer_group: '{ORDER10}',
        });
    }

}
module.exports = new PaymentController;