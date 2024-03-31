const { Address } = require('../model/Address');

exports.fetchAddressByNumber = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    // const user = await User.findById(id, 'name email phoneNumber, role').exec();
    const address = await Address.findOne({ phoneNumber: { $eq: phoneNumber} });
    res.status(200).json(address);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createAddress = async (req, res) => {
  const { phoneNumber } = req.body;
  const existingAddress = await Address.findOne({ phoneNumber: {$eq: phoneNumber} });
  try {
    if (existingAddress) {
      await Address.findOneAndUpdate(
        { phoneNumber: {$eq: phoneNumber} },
        { ...req.body }
      );
      return res.status(201).json({ message: 'Address Details Updated' });
    } else {
      const newAddress = new Address({ phoneNumber, ...req.body });
      await newAddress.save();
      return res.status(201).json({ message: 'Address Details Saved' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteAddress = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    await Address.deleteOne({ phoneNumber: { $eq: phoneNumber} });
    res.status(200).json({ message: 'Address Deleted Successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
