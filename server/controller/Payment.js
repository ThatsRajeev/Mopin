const { Cashfree } = require('cashfree-pg');
const Order = require('../model/Order');
const Payment = require('../model/Payment');
require("dotenv").config();

exports.createPayment = async (req, res) => {
  const sixteenMinutesFromNow = new Date(Date.now() + 16 * 60000);
  try {
    const request = {
      "order_amount": req.body.totalCost,
      "order_currency": "INR",
      "order_id": Date.now().toString(),
      "order_expiry_time": sixteenMinutesFromNow.toISOString(),
      "customer_details": {
        "customer_id": req.body.number.slice(3),
        "customer_phone": req.body.number.slice(3)
      },
      "order_meta": {
        "return_url": "https://mopin-frontend.vercel.app/order-success?order_id={order_id}",
        "notify_url": "https://mopin-server.vercel.app/payments/verify"
      },
    };
    const payment = new Payment(request);
    await payment.save();
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const rawBody = await req.rawBody;
    Cashfree.PGVerifyWebhookSignature(req.headers["x-webhook-signature"], rawBody, req.headers["x-webhook-timestamp"]);

    const webhookData = req.body.data;
    const orderId = webhookData.order.order_id;
    const paymentStatus = webhookData.payment.payment_status;

    const payment = await Order.findByIdAndUpdate(orderId, paymentStatus, {new:true});

    res.status(201).json({ message: 'Payment status updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.find({orderId: id});

    if (!order) {
      res.status(404).json({ message: "No order found for the provided order_id" });
    } else {
      const paymentStatus = order.paymentStatus;
      res.status(200).json({ paymentStatus });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
