const Product = require("../models/product");
const { createError } = require("../utils/error");
const mongoose = require("mongoose");

////// Create  -------------------------------------------------------------------------------------------------/////

exports.postAddProduct = async (req, res, next) => {
  const dataReq = req.body;
  try {
    const newProduct = new Product(dataReq);
    const savedProduct = await newProduct.save();
    return res.status(200).json({
      success: true,
      message: "Data received successfully",
      data: data,
    });
  } catch (err) {
    createError(err);
  }
};

////// Read  -------------------------------------------------------------------------------------------------/////

exports.getProducts = async (req, res, next) => {
  try {
    const producs = await Product.find().sort({ createdAt: -1 }).limit(8);
    return res.status(200).json(producs);
  } catch (err) {
    return createError(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId).select(
      "-createdAt -updatedAt"
    );
    if (!product) {
      return createError(404, "Product not found");
    }

    // Lấy tất cả các sản phẩm cùng danh mục
    const productsInCategory = await Product.find({
      category: product.category,
      _id: { $ne: new mongoose.Types.ObjectId(productId) },
    });
    return res.status(200).json({ product, productsInCategory });
  } catch (err) {
    return createError(err);
  }
};

////// Update  -------------------------------------------------------------------------------------------------/////

exports.postUpdateProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return createError(err);
  }
};

////// DELETE   -------------------------------------------------------------------------------------------------/////

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({ message: "Success", product: deleteProduct });
  } catch (err) {
    return createError(err);
  }
};
