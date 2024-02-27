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
    console.log(req.body);
    var request = {
        "order_amount": req.body.totalCost,
        "order_currency": "INR",
        "order_id": uuidv4(),
        "customer_details": {
            "customer_id": req.body.number,
            "customer_phone": req.body.number
        },
        "order_meta": {
            "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout/?order_id={order_id}",
            "notify_url": "https://mopin-server.vercel.app/api/payment/verify"
        },
    };

    Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
        console.log('Order created successfully:',response.data);
    }).catch((error) => {
        console.error('Error:', error.response.data.message);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
})

module.exports = router;
