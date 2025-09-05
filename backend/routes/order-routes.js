const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post("/create-order", async (req, res) => {
    try {
        const { userId, items, total, paymentIntentId } = req.body;

        //verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId.split("_secret_")[0]);

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ error: "Payment not completed" });
        }

        const order = new Order({ userId, items, total, paymentIntentId, status: "paid" });
        await order.save();

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create order" });
    }
});

module.exports = router;