const router = require("express").Router();
const { Cashfree } = require('cashfree-pg');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
// create noOfOrders

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

router.post("/orders", async (req, res) => {
  try {
    var request = {
        "order_amount": req.body.totalCost,
        "order_currency": "INR",
        "order_id": uuidv4(),
        "customer_details": {
            "customer_id": req.body.number.slice(3),
            "customer_phone": req.body.number.slice(3)
        },
        "order_meta": {
            "return_url": "https://mopin-frontend.vercel.app/order-success?order_id={order_id}",
            "notify_url": "https://mopin-server.vercel.app/api/payment/verify"
        },
    };

    Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
        res.json(response.data);
    }).catch((error) => {
        return res.status(500).send(error.response.data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    Cashfree.PGVerifyWebhookSignature(req.headers["x-webhook-signature"], req.rawBody, req.headers["x-webhook-timestamp"]);
    console.log(req.body);
    res.status(200).json({ message: 'Payment verified Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
})

module.exports = router;
