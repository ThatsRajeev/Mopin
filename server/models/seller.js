const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  id: String, 
  name: String,
  imgURL: String,
  foodType: String,
  quote: String,
  rating: String,
  feeds: String,
  noOfOrders: String,
  minPrice: String,
  healthyPick: Boolean,
  veg: Boolean,
  spicy: Boolean,
  dairyFree: Boolean,
  dateOfJoining: Date,
  subscriptionCost: String,
  dishes: [{
    name: String,
    description: String,
    price: String,
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
