const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  imgURL: { type: String, required: true },
  foodType: String,
  quote: String,
  rating: { type: Number, min: [0, 'wrong min price'], max: [5, 'wrong max price'], default: 0 },
  feeds: { type: Number, min: [0, 'wrong min price'], max: [1000, 'wrong max price'] },
  noOfOrders: { type: Number, min: [0, 'wrong min price'], max: [10000, 'wrong max price'] },
  minPrice: { type: Number, min: [0, 'wrong min price'], max: [10000, 'wrong max price'] },
  healthyPick: Boolean,
  veg: Boolean,
  spicy: Boolean,
  dairyFree: Boolean,
  dateOfJoining: Date,
  subscriptionCost: { type: Number, min: [0, 'wrong min price'], max: [10000, 'wrong max price'] },
  dishes: [{
    name: String,
    description: String,
    price: { type: Number, min: [0, 'wrong min price'], max: [10000, 'wrong max price'] },
    imgURL: String,
    isVeg: Boolean,
    availability: [{
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      meal: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'] },
    }]
  }]
});

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;
