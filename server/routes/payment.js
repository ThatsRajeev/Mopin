const router = require("express").Router();
const { Cashfree } = require('cashfree-pg');
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/order');
require("dotenv").config();

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

router.post("/paymentstatus", async (req, res) => {
  console.log("Reached /paymentstatus route");
  try {
    const { payment_id } = req.body;
    const orders = await Order.find({ paymentId: payment_id });

    if (!orders || orders.length === 0) {
      res.status(404).json({ message: "No orders found for the provided payment_id" });
    } else {
      const paymentStatuses = orders.map(order => ({
        orderId: order.orderId,
        paymentStatus: order.paymentStatus
      }));
      res.status(200).json({ paymentStatuses });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order status" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const fiveMinutesFromNow = new Date(Date.now() + 16 * 60000);
    const request = {
      "order_amount": req.body.totalCost,
      "order_currency": "INR",
      "order_id": uuidv4(),
      "order_expiry_time": fiveMinutesFromNow.toISOString(),
      "customer_details": {
        "customer_id": req.body.number.slice(3),
        "customer_phone": req.body.number.slice(3)
      },
      "order_meta": {
        "return_url": "https://mopin-frontend.vercel.app/order-success?order_id={order_id}",
        "notify_url": "https://mopin-server.vercel.app/api/payment/verify"
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const rawBody = await req.rawBody;
    Cashfree.PGVerifyWebhookSignature(req.headers["x-webhook-signature"], rawBody, req.headers["x-webhook-timestamp"]);

    const webhookData = req.body.data;
    const paymentId = webhookData.order.order_id;
    const paymentStatus = webhookData.payment.payment_status;

    const updateResult = await Order.updateMany(
      { paymentId },
      { paymentStatus }
    );

    if (updateResult.matchedCount === 0) {
      res.status(404).json({ message: "No orders found for the provided paymentId" });
    } else {
      // Optionally handle additional logic based on paymentStatus
      // e.g., sending notifications, updating inventory
      res.status(200).json({ message: 'Payment status updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying payment" });
  }
});

module.exports = router;
