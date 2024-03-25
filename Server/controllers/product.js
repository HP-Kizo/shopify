const Product = require("../models/product");
const { createError } = require("../utils/error");

////// Create  -------------------------------------------------------------------------------------------------/////

exports.postAddproduct = async (req, res, next) => {
  const dataReq = req.body;
  try {
  } catch (err) {
    createError(err);
  }
};

////// Read  -------------------------------------------------------------------------------------------------/////

exports.getProducts = async (req, res, next) => {
  try {
    const producs = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.status(200).json(producs);
  } catch (err) {
    createError(err);
  }
};
