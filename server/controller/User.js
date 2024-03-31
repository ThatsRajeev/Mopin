const { User } = require('../model/User');

exports.fetchUserByNumber = async (req, res) => {
  const { encodedPhoneNumber } = req.params;
  const decodedPhoneNumber = decodeURIComponent(encodedPhoneNumber);
  try {
    // const user = await User.findById(id, 'name email phoneNumber, role').exec();
    const user = await User.findOne({ phoneNumber: { $eq: decodedPhoneNumber} });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createUser = async (req, res) => {
  const { phoneNumber, name, email } = req.body;
  try {
    const foundUserByPhone = await User.findOne({ phoneNumber: {$eq: phoneNumber} });
    const foundUserByEmail = email ? await User.findOne({ email: {$eq: email} }) : null;

    if (foundUserByPhone && name) {
      return res.status(409).json({ message: 'Phone number already exists' });
    } else if (foundUserByEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    } else if (foundUserByPhone && !email) {
      return res.status(201).json({ message: 'User Found' });
    } else if (!foundUserByPhone && !email) {
      return res.status(409).json({ message: 'Create an Account' });
    } else {
      const newUser = new User({ phoneNumber, name, email, role: "user" });
      await newUser.save();
      return res.status(201).json({ message: 'User Details Saved' });
    }
    res.status(201).json(query);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
