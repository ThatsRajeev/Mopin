const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_amount: { type: Number, required: true },
  order_currency: { type: String, default: 'INR' },
  order_id: { type: String, required: true },
  order_expiry_time: { type: Date, required: true },
  customer_details: {
    customer_id: { type: String, required: true },
    customer_phone: { type: String, required: true }
  },
});

exports.Payment = mongoose.model('Payment', paymentSchema);
