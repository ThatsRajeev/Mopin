const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const request = require('request');
const { validationResult } = require('express-validator');
const paymentRoutes = require('./routes/payment');
const path = require('path');
const Order = require('./models/order');
const Seller = require('./models/seller');

dotenv.config();

// Middleware
app.use((req, res, next) => {
    req.rawBody = new Promise(resolve => {
      buf = '';
      req.on('data', x => buf += x);
      req.on('end', () => {
        resolve(buf);
      });
    });
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

app.use(cors({
  origin: ["https://mopin-frontend.vercel.app", "http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true,
}));

// MongoDB Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

// Error Handling Function
function handleErrors(res, error, message = 'Error processing request') {
  console.error(error);
  return res.status(500).send(message);
}

// Payment Routes
app.use("/api/payment", paymentRoutes);

// Formspree Route
app.post('/formspree', (req, res) => {
  const url = 'https://formspree.io/f/mknlpedg';
  request.post({ url, form: req.body }, (err, httpResponse, body) => {
    if (err) {
      return handleErrors(res, err);
    }
    res.send(body);
  });
});

// User Routes
const userSchema = new mongoose.Schema({
  phoneNumber: Number,
  name: String,
  email: String,
  address: String,
  role: {type: String, enum: ['user', 'admin'], default: 'user'},
});

const User = mongoose.model("User", userSchema);

app.post("/api/endpoint", async (req, res) => {
  try {
    const { phoneNumber, name, email } = req.body;
    const foundUserByPhone = await User.findOne({ phoneNumber: {$eq: phoneNumber} });
    const foundUserByEmail = email ? await User.findOne({ email: {$eq: email} }) : null;

    if (foundUserByPhone && name) {
      return res.json({ message: 'Phone number already exists' });
    } else if (foundUserByEmail) {
      return res.json({ message: 'Email already exists' });
    } else if (foundUserByPhone && !email) {
      return res.json({ message: 'User Found' });
    } else if (!foundUserByPhone && !email) {
      return res.json({ message: 'Create an Account' });
    } else {
      const newUser = new User({ phoneNumber, name, email, role: "user" });
      await newUser.save();
      return res.json({ message: 'User Details Saved' });
    }
  } catch (err) {
    handleErrors(res, err);
  }
});

// UserData Route
app.post('/api/userdata', async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() })
    }
    const foundUserByPhone = await User.findOne({ phoneNumber: { $eq: req.body.phoneNumber} });

    if (!foundUserByPhone) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: foundUserByPhone.name,
      email: foundUserByPhone.email,
      phoneNumber: foundUserByPhone.phoneNumber,
      role: foundUserByPhone.role
    });
  } catch (err) {
    handleErrors(res, err);
  }
});

// Address Routes
const addressSchema = new mongoose.Schema({
  phoneNumber: Number,
  address: String,
  houseNo: String,
  houseName: String,
  landmark: String,
  addressType: String
});

const Address = mongoose.model("Address", addressSchema);

app.post("/api/savepoint", async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const existingAddress = await Address.findOne({ phoneNumber: {$eq: phoneNumber} });

    if (existingAddress) {
      await Address.findOneAndUpdate(
        { phoneNumber: {$eq: phoneNumber} },
        { ...req.body }
      );
      return res.json({ message: 'Address Details Updated' });
    } else {
      const newAddress = new Address({ phoneNumber, ...req.body });
      await newAddress.save();
      return res.json({ message: 'Address Details Saved' });
    }
  } catch (err) {
    handleErrors(res, err);
  }
});

// Address Data Route
app.post('/api/addressdata', async (req, res) => {
  try {
    const foundAddress = await Address.findOne({ phoneNumber: { $eq: req.body.phoneNumber} });

    if (!foundAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({
      address: foundAddress.address,
      houseNo: foundAddress.houseNo,
      houseName: foundAddress.houseName,
      landmark: foundAddress.landmark,
      addressType: foundAddress.addressType
    });
  } catch (err) {
    handleErrors(res, err);
  }
});

// Delete Data Route
app.post('/api/deletedata', async (req, res) => {
  try {
    await Address.deleteOne({ phoneNumber: req.body.phoneNumber });
    res.json({ message: 'Address Deleted Successfully' });
  } catch (err) {
    handleErrors(res, err);
  }
});

//Seller Route
app.get('/api/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.json(sellers);
  } catch (err) {
    handleErrors(res, err);
  }
});

// Order routes
function getDateFromDay(targetDay) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentDay = days[today.getDay()];

  const targetDate = (currentDay === targetDay) ? today : new Date(today.getTime() + ((days.indexOf(targetDay) - days.indexOf(currentDay) + 7) % 7) * 24 * 60 * 60 * 1000);
  const formattedDate = targetDate.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' });

  return formattedDate;
}

async function getDishInfo(sellerId, dishName) {
    try {
        const seller = await Seller.findOne({ _id: sellerId });

        if (!seller) {
            return null;
        }

        const dish = seller.dishes.find(d => d.name === dishName);

        return dish ? { dishName: dish.name, price: dish.price } : null;

    } catch (err) {
        console.error('Error fetching dish info: ', err);
        throw err;
    }
}

app.post("/api/order", async (req, res) => {
  try {
    const { name, number, address, dishes, subscriptions } = req.body.orderData;

    const newOrder = new Order({
      orderId: req.body.orderId,
      name: name,
      phoneNumber: number,
      address,
      orderItems: [],
      totalAmount: 0,
      paymentStatus: "Pending",
      createdAt: new Date(),
      updatedAt: null,
    });

    for (const [seller, sellerDishes] of Object.entries(dishes)) {
      for (const [dishName, dish] of Object.entries(sellerDishes)) {
        const deliveryDate = getDateFromDay(dish.availability[0].day);
        const itemGroup = newOrder.orderItems.find(group => group.deliveryDate.toISOString().slice(0,10) === deliveryDate.toISOString().slice(0,10));

        const dishInfo = getDishInfo(seller, dish.name);

        if (itemGroup) {
          itemGroup.items.push({
            sellerId: seller,
            dishName: dish.name,
            quantity: dish.qty,
            mealTime: dish.availability[0].meal,
            price: parseInt(dishInfo.price),
            status: "Pending",
          });
        } else {
          newOrder.orderItems.push({
            deliveryDate,
            items: [{
              sellerId: seller,
              dishName: dish.name,
              quantity: dish.qty,
              mealTime: dish.availability[0].meal,
              price: parseInt(dishInfo.price),
              status: "Pending",
            }]
          });
        }
        newOrder.totalAmount += dish.qty * parseInt(dish.price);
      }
    }

    await newOrder.save();

    res.status(200).json({ message: "Orders placed successfully!" });
  } catch (err) {
    handleErrors(res, err);
  }
});

app.get("/api/orders/:phoneNumber", async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const orders = await Order.find({ phoneNumber: {$eq: phoneNumber} });

    res.status(200).json({ orders });
  } catch (err) {
    handleErrors(res, err);
  }
});

const today = new Date();
today.setHours(0, 0, 0, 0);

app.get('/api/ordersdata', async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: "SUCCESS" }).populate('items.sellerId');
    console.log(orders);

    const transformedOrders = transformOrdersForFrontend(orders);
    res.json(transformedOrders);
  } catch (err) {
    handleErrors(res, err);
  }
});

function transformOrdersForFrontend(orders) {
  const frontendOrders = {};

  orders.forEach(order => {
    order.orderItems.forEach(itemsGroup => {
      const dateKey = itemsGroup.deliveryDate.toISOString().slice(0, 10);
      const frontendDateObj = frontendOrders[dateKey] || {};

      itemsGroup.items.forEach(item => {
        const sellerName = item.sellerId;
        const mealTime = item.mealTime;

        const frontendMealTimeObj = frontendDateObj[mealTime] || {};
        const frontendSellerObj = frontendMealTimeObj[sellerName] || { dish: null, customers: [], sellerTotal: 0 };

        if (!frontendSellerObj.dish) {
          const dishInfo = getDishInfo(item.sellerId, item.dishName);
          frontendSellerObj.dish = dishInfo ? { dishName: dishInfo.name, price: dishInfo.price } : null;
        }

        // Add customers
        frontendSellerObj.customers.push({
          name: order.name,
          phoneNumber: order.phoneNumber,
          address: order.address,
          quantity: item.quantity
        });

        // Accumulate seller total
        frontendSellerObj.sellerTotal += item.quantity * (frontendSellerObj.dish ? frontendSellerObj.dish.price : 0);

        frontendMealTimeObj[sellerName] = frontendSellerObj;
        frontendDateObj[mealTime] = frontendMealTimeObj;
        frontendOrders[dateKey] = frontendDateObj;
      });
    });
  });

  return frontendOrders;
}

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
