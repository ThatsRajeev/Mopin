const { Cashfree } = require('cashfree-pg');
const { Order } = require('../model/Order');
const { Payment } = require('../model/Payment');
require("dotenv").config();

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

exports.createPayment = async (req, res) => {
  const sixteenMinutesFromNow = new Date(Date.now() + 16 * 60000);
  try {
    const request = {
      "order_amount": req.body.totalCost,
      "order_currency": "INR",
      "order_id": Date.now().toString(),
      "order_expiry_time": sixteenMinutesFromNow.toISOString(),
      "customer_details": {
        "customer_id": req.body.uid,
        "customer_phone": req.body.number
      },
      "order_meta": {
        "return_url": process.env.FRONTEND_ORIGIN + "/order-success?order_id={order_id}",
        "notify_url": "https://mopin-server.vercel.app/payments/verify"
      },
    };
    const payment = new Payment(request);
    await payment.save();

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    res.status(201).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const rawBody = await req.rawBody;
    console.log(rawBody);
    Cashfree.PGVerifyWebhookSignature(req.headers["x-webhook-signature"], rawBody, req.headers["x-webhook-timestamp"]);

    const webhookData = req.body.data;
    const orderId = webhookData.order.order_id;
    const paymentStatus = webhookData.payment.payment_status;

    // const updatedOrder = await Order.findOneAndUpdate(
    //   { orderId: orderId },
    //   { $set: { paymentStatus: paymentStatus } },
    //   { new: true }
    // );

    if (true) {
      res.status(201).json({ message: 'Payment status updated successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};


exports.fetchPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({orderId: id});

    if (!order) {
      res.status(404).json({ message: "No order found for the provided order_id" });
    } else {
      const paymentStatus = order.paymentStatus;
      res.status(200).json({ paymentStatus: paymentStatus });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
