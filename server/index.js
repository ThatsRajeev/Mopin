const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const request = require('request');
const { validationResult } = require('express-validator');
const path = require('path');

const Order = require('./model/Order');
const Seller = require('./model/Seller');
const sellersRouter = require('./routes/Sellers');
const userRouter = require('./routes/Users');
const addressRouter = require('./routes/Addresses');
const paymentRouter = require('./routes/Payments');

dotenv.config();

// Middlewares
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
app.use(cors({
  origin: ["https://mopin-frontend.vercel.app", "http://localhost:3000"],
  methods: ["POST", "GET", "PATCH"],
  credentials: true,
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sellers', sellersRouter.router);
app.use('/users', userRouter.router);
app.use('/addresses', addressRouter.router);
app.use('/payments', paymentRouter.router);

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

// Order routes
function getDateFromDay(targetDay) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentDay = days[today.getDay()];

  const targetDate = (currentDay === targetDay) ? today : new Date(today.getTime() + ((days.indexOf(targetDay) - days.indexOf(currentDay) + 7) % 7) * 24 * 60 * 60 * 1000);

  return targetDate;
}

async function getDishInfo(sellerName, dishName) {
    try {
        const seller = await Seller.findOne({ name: sellerName });

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

        const dishInfo = await getDishInfo(seller, dish.name);

        if (itemGroup) {
          itemGroup.items.push({
            sellerName: seller,
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
              sellerName: seller,
              dishName: dish.name,
              quantity: dish.qty,
              mealTime: dish.availability[0].meal,
              price: parseInt(dishInfo.price),
              status: "Pending",
            }]
          });
        }
        newOrder.totalAmount += dish.qty * parseInt(dishInfo.price);
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
    const orders = await Order.findOne({ phoneNumber: {$eq: phoneNumber} });

    res.status(200).json({ orders });
  } catch (err) {
    handleErrors(res, err);
  }
});

const today = new Date();
today.setHours(0, 0, 0, 0);

app.get('/api/ordersdata', async (req, res) => {
  try {
    const orders = await Order.findOne({ paymentStatus: "SUCCESS" }).populate({
      path: 'items.sellerName',
      strictPopulate: false
  });

    const transformedOrders = await transformOrdersForFrontend(orders);
    res.json(transformedOrders);
  } catch (err) {
    handleErrors(res, err);
  }
});

async function transformOrdersForFrontend(orders) {
  const frontendOrders = {};

  for (const order of orders) {
    for (const itemsGroup of order.orderItems) {
      const dateKey = itemsGroup.deliveryDate.toISOString().slice(0, 10);
      const frontendDateObj = frontendOrders[dateKey] || {};

      for (const item of itemsGroup.items) {
        const sellerName = item.sellerName;
        const mealTime = item.mealTime;

        const frontendMealTimeObj = frontendDateObj[mealTime] || {};
        const frontendSellerObj = frontendMealTimeObj[sellerName] || { dish: null, customers: [], sellerTotal: 0 };

        if (!frontendSellerObj.dish) {
          const dishInfo = await getDishInfo(item.sellerName, item.dishName);
          frontendSellerObj.dish = dishInfo ? { dishName: dishInfo.dishName, price: dishInfo.price, quantity: item.quantity, status: item.status } : null;
        }
        // Add customers
        frontendSellerObj.customers.push({
          name: order.name,
          phoneNumber: order.phoneNumber,
          address: order.address,
          orderId: order.orderId
        });

        // Accumulate seller total
        frontendSellerObj.sellerTotal += item.quantity * (frontendSellerObj.dish ? frontendSellerObj.dish.price : 0);

        frontendMealTimeObj[sellerName] = frontendSellerObj;
        frontendDateObj[mealTime] = frontendMealTimeObj;
        frontendOrders[dateKey] = frontendDateObj;
      }
    }
  }
  return frontendOrders;
}

app.post('/api/editOrdersdata', async (req, res) => {
  try {
    const { orderId, sellerName, dishName, status } = req.body;

    const updateResult = await Order.updateOne(
    {
      orderId: orderId,
      "orderItems": {
        $elemMatch: { // Target a 'deliveryDate' subdocument
          "items": { // Filter within the nested 'items'
            $elemMatch: {
              dishName: dishName,
              sellerName: sellerName
            }
          }
        }
      }
    },
    {
      $set: { "orderItems.$[outer].items.$[inner].status": status }
    }
  );

      if (updateResult.matchedCount === 0) {
       res.status(404).json({ message: "Order or dish not found" });
     } else if (updateResult.modifiedCount === 0) {
       res.status(400).json({ message: "Status was already the same" });
     } else {
       res.status(200).json({ message: 'Dish status updated successfully' });
     }
  } catch (err) {
    handleErrors(res, err);
  }
});

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
