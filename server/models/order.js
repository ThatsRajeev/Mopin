const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  paymentId: String,
  name: String,
  phoneNumber: String,
  address: String,
  sellerName: String,
  items: [
    {
      dishName: String,
      quantity: Number,
      mealTime: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner']},
      deliveryDate: Date,
      price: Number,
      status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'], default: 'Pending' },
    },
  ],
  totalAmount: Number,
  paymentStatus: { type: String, enum: ['Pending', 'Success', 'Failed', 'Refunded'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
