const express = require('express');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const request = require('request');
const paymentRoutes = require('./routes/payment');
const path = require('path');

dotenv.config();

// Middleware
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

// Proxy Route
app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${req.url.slice(1)}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    handleErrors(res, error, 'Internal Server Error');
  }
});

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
  address: String
});

const User = mongoose.model("User", userSchema);

app.post("/api/endpoint", async (req, res) => {
  try {
    const { phoneNumber, name, email } = req.body;
    const foundUserByPhone = await User.findOne({ phoneNumber });
    const foundUserByEmail = email ? await User.findOne({ email }) : null;

    if (foundUserByPhone && name) {
      return res.json({ message: 'Phone number already exists' });
    } else if (foundUserByEmail) {
      return res.json({ message: 'Email already exists' });
    } else if (foundUserByPhone && !email) {
      return res.json({ message: 'User Found' });
    } else if (!foundUserByPhone && !email) {
      return res.json({ message: 'Create an Account' });
    } else {
      const newUser = new User({ phoneNumber, name, email });
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
    const foundUserByPhone = await User.findOne({ phoneNumber: req.body.phoneNumber });

    if (!foundUserByPhone) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: foundUserByPhone.name,
      email: foundUserByPhone.email,
      phoneNumber: foundUserByPhone.phoneNumber
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
    const existingAddress = await Address.findOne({ phoneNumber });

    if (existingAddress) {
      await Address.findOneAndUpdate(
        { phoneNumber },
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
    const foundAddress = await Address.findOne({ phoneNumber: req.body.phoneNumber });

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

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
