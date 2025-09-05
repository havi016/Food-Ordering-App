const express = require('express')
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    // create payment intent
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'gbp',
            automatic_payment_methods: {
                enabled: true
            }
        });

        res.json({paymentIntent: paymentIntent.client_secret});

    } catch(err){
        res.status(400).json({error: err.message});
    }

}

// router endpoints
router.post('/intents', createPaymentIntent );

module.exports = router;
