const express = require('express');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/payment");
const path = require("path");

dotenv.config();

app.use(cors({
  origin: "https://mopin-frontend.vercel.app",
  methods: ["POST", "GET"],
  credentials: true
}));
dotenv.config();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(cookieParser());

app.use("/api/payment", paymentRoutes);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const userSchema = new mongoose.Schema ({
  phoneNumber: Number,
  name: String,
  email: String,
  address: String
});

const User = new mongoose.model("User", userSchema);

app.get("/api/endpoint", (req, res) => {
  res.send("Get Request called");
});

app.post("/api/endpoint", async (req, res) => {

  try {
    const foundUserByPhone = await User.findOne({ phoneNumber: req.body.phoneNumber });
    const foundUserByEmail = req.body.email ? await User.findOne({ email: req.body.email }) : null;

    if (foundUserByPhone && req.body.name) {
      return res.send("Phone number already exists");

    } else if (foundUserByEmail) {
      return res.send("Email already exists");

    } else if (foundUserByPhone && !req.body.email) {
      return res.send("User Found");

    } else if (!foundUserByPhone && !req.body.email){
      return res.send("Create an Account");

    } else {
      const newUser = new User({
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      email: req.body.email,
    });

    await newUser.save();
    return res.send("User Details Saved");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
});

app.post('/api/authenticate', (req, res) => {
  const payload = {
    phoneNumber: req.body.phoneNumber
  }
  const expiresIn = 60*60*24*30;

  jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn }, (err, token)=> {
    if (err) {
      console.error(err);
      return res.status(500).json({message: "Error generating token"});
    }
      res.cookie("token", token);
    res.send(req.cookies);
  });
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Store the decoded token in the request object for further use
    req.user = decoded;
    next();
  });
};

var phoneNumber = "";
app.get('/api/userdata', verifyToken, async (req, res) => {
  try {
    // Access user data from the decoded token
    phoneNumber = req.user.phoneNumber;
    const foundUserByPhone = await User.findOne({ phoneNumber: req.user.phoneNumber });

    if (!foundUserByPhone) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      name: foundUserByPhone.name,
      email: foundUserByPhone.email,
      phoneNumber: foundUserByPhone.phoneNumber
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error processing request');
  }
});

// Handle Address Saving
const addressSchema = new mongoose.Schema ({
  phoneNumber: Number,
  address: String,
  apartmentNumber: String,
  apartmentName: String,
  streetDetails: String,
  addressType: String
});

const Address = new mongoose.model("Address", addressSchema);

app.get("/api/savepoint", (req, res) => {
  res.send("Get Request called");
});

app.post("/api/savepoint", async (req, res) => {

  try {
    const newAddress = new Address({
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      apartmentNumber: req.body.apartmentNumber,
      apartmentName: req.body.apartmentName,
      streetDetails: req.body.streetDetails,
      addressType: req.body.addressType
    });

    await newAddress.save();
    return res.send("Address Details Saved");

  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
});

app.get('/api/addressdata', async (req, res) => {
  try {
    if(phoneNumber) {
      const foundAddress = await Address.findOne({ phoneNumber: phoneNumber });

      if (!foundAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }
      res.json({
        address: foundAddress.address,
        apartmentNumber: foundAddress.apartmentNumber,
        apartmentName: foundAddress.apartmentName,
        streetDetails: foundAddress.streetDetails,
        addressType: foundAddress.addressType
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error processing request');
  }
});

app.get('/api/deletedata', async (req, res) => {
  try {
    // Access user data from the decoded token
    await Address.deleteOne({ phoneNumber: phoneNumber });
    res.send("Address Deleted Successfully")
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error processing request');
  }
});

const cartSchema = new mongoose.Schema ({
  sellerName: String,
  dishName: String,
  dishPrice: String,
  dishDesc: String,
  dishIsVeg: Boolean,
  dishQuantity: Number,
});

const Cart = new mongoose.model("Cart", cartSchema);

app.post('/api/cartSummary', async (req, res) => {
  try {
    const cartInfo = new Cart({
      sellerName: req.body.sellerName,
      dishName: req.body.dishName,
      dishPrice: req.body.dishPrice,
      dishDesc: req.body.dishDesc,
      dishIsVeg: req.body.dishIsVeg,
      dishQuantity: req.body.dishQuantity
    });
    const foundDish = await Cart.findOne({dishName: req.body.dishName})

    if(foundDish) {
      if(req.body.dishQuantity==0) {
        await Cart.deleteOne({dishName: req.body.dishName});
      } else {
        await Cart.updateOne({dishName: req.body.dishName}, {dishQuantity: req.body.dishQuantity});
      }
    } else {
      await cartInfo.save();
    }
    return res.send("Cart Items Saved");

  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
});

app.get('/api/cartSummary', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    return res.json(cartItems);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
});

app.get('/api/logout', (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
