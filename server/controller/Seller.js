const { Seller } = require('../model/Seller');

exports.createSeller = async (req, res) => {
  const seller = new Seller(req.body);
  try {
    const doc = await seller.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllSellers = async (req, res) => {
  const query = await Seller.find({});
  console.log(query);
  try {
    // const docs = await query.exec();
    res.status(201).json(query);
  } catch (err) {
    res.status(400).json(err);
  }
};
