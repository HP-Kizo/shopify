const mongoose = require("mongoose");
const Cart = require("../models/cart");
const { createError } = require("../utils/error");

//CREATE
exports.createCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Create a new cart
    const newCart = new Cart({
      userId,
      products,
    });

    // Save the new cart to the database
    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Error creating the cart" });
  }
};

//READ
exports.getCarts = async (req, res, next) => {
  const carts = await Cart.findOne({ userId: req.session._id });
  try {
    if (carts) {
      return res.status(200).json(carts);
    }
    res.status(204).json({ message: "You don't have anything in your cart" });
  } catch (error) {
    createError(500, "Not found");
  }
};
//UPDATE

exports.updateCart = async (req, res, next) => {
  const data = req.body.cart_manager;
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.session._id },
      {
        $set: { userId: req.session._id, products: data },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json(updatedCart.products);
  } catch (error) {
    createError(500, "Not found");
  }
};

//DELETE
