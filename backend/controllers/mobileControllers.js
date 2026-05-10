const Mobile = require("../models/Mobile");

const addMobile = async (req, res) => {
  try {
    const mobile = await Mobile.create(req.body);

    res.status(201).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMobiles = async (req, res) => {
  try {
    const mobiles = await Mobile.find();

    res.json(mobiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMobile,
  getMobiles,
};