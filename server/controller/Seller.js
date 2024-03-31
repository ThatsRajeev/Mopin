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
  try {
    // const docs = await query.exec();
    res.status(201).json(query);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchSellerById = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findById(id);
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json(err);
  }
};
