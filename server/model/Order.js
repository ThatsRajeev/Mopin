const mongoose = require('mongoose');
const Seller = require('./Seller');

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  name: String,
  phoneNumber: String,
  address: String,
  orderItems: [{
    deliveryDate: Date,
    items: [
      {
        sellerName: { type: String, ref: 'Seller' },
        dishName: String,
        quantity: Number,
        mealTime: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'] },
        price: Number,
        status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'], default: 'Pending' },
      }
    ]
  }],
  totalAmount: Number,
  paymentStatus: { type: String, enum: ['Pending', 'Success', 'Failed', 'Refunded'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
