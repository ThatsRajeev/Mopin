const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const path = require('path');

const sellersRouter = require('./routes/Sellers');
const userRouter = require('./routes/Users');
const addressRouter = require('./routes/Addresses');
const orderRouter = require('./routes/Orders');
const paymentRouter = require('./routes/Payments');

dotenv.config();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(function(req, res, next){
   var data = "";
   req.on('data', function(chunk){ data += chunk})
   req.on('end', function(){
      req.rawBody = data;
      next();
   })
})
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

app.use('/sellers', sellersRouter.router);
app.use('/users', userRouter.router);
app.use('/addresses', addressRouter.router);
app.use('/orders', orderRouter.router);
app.use('/payments', paymentRouter.router);

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
