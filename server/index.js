const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/payment");
const path = require("path");
const bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

app.use(cors({
  origin: ["https://mopin-frontend.vercel.app", "http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true,
}));

app.use("/api/payment", paymentRoutes);

app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${req.url.slice(1)}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/formspree', function(req, res) {
  var url = 'https://formspree.io/f/mknlpedg';

  request.post({ url: url, form: req.body }, function(err, httpResponse, body) {
    if (err) {
      console.error('Error:', err);
      return res.sendStatus(500);
    }

    res.send(body);
  });
});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

// Handle User Data
const userSchema = new mongoose.Schema ({
  phoneNumber: Number,
  name: String,
  email: String,
  address: String
});

const User = new mongoose.model("User", userSchema);

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

app.post('/api/userdata', async (req, res) => {
  try {
    const foundUserByPhone = await User.findOne(
      { phoneNumber: req.body.phoneNumber }
    );

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
  houseNo: String,
  houseName: String,
  landmark: String,
  addressType: String
});

const Address = new mongoose.model("Address", addressSchema);

app.get("/api/savepoint", (req, res) => {
  res.send("Get Request called");
});

app.post("/api/savepoint", async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;

    const existingAddress = await Address.findOne({ phoneNumber });

    if (existingAddress) {
      await Address.findOneAndUpdate(
        { phoneNumber },
        {
          address: req.body.address,
          houseNo: req.body.houseNo,
          houseName: req.body.houseName,
          landmark: req.body.landmark,
          addressType: req.body.addressType
        }
      );
      return res.send("Address Details Updated");
    } else {

      const newAddress = new Address({
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        houseNo: req.body.houseNo,
        houseName: req.body.houseName,
        landmark: req.body.landmark,
        addressType: req.body.addressType
      });

      await newAddress.save();
      return res.send("Address Details Saved");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error processing request");
  }
});

app.post('/api/addressdata', async (req, res) => {
  try {
    const foundAddress = await Address.findOne(
      { phoneNumber: req.body.phoneNumber }
    );

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
    console.error(err);
    return res.status(500).send('Error processing request');
  }
});

app.post('/api/deletedata', async (req, res) => {
  try {
    await Address.deleteOne(
      { phoneNumber: req.body.phoneNumber }
    );
    res.send("Address Deleted Successfully")
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error processing request');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
