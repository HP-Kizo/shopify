const mongoose = require("mongoose");
const Order = require("../models/order");
const Cart = require("../models/cart");

const User = require("../models/user");
const { createError } = require("../utils/error");
const { sendMail, content } = require("../middleware/sendMail");

exports.postOrder = async (req, res, next) => {
  const orderData = req.body;
  try {
    const newOrder = new Order({
      userId: req.session._id,
      products: orderData.products,
      total: orderData.total,
      information: orderData.information,
    });
    const savedOrder = await newOrder.save();
    console.log(savedOrder);

    await Cart.deleteMany({ userId: req.session._id });
    await sendMail(
      orderData.information.email,
      "Success",
      content(
        orderData.information.fullname,
        orderData.information.phone,
        orderData.information.address,
        savedOrder.products,
        savedOrder.total
      )
    );
    return res.status(200).json(savedOrder);
  } catch (error) {
    createError(500, "Something went wrongs");
  }
};

exports.getOrders = async (req, res, next) => {
  const userId = req.session._id;
  try {
    const order = await Order.find({ userId: userId });
    if (order) {
      return res.status(200).json(order);
    }
    res.status(204).json({ message: "You don't have anything in your cart" });
  } catch (error) {
    createError(404, "Something went wrong");
  }
};

exports.getOrder = async (req, res, next) => {
  const orderId = req.params.id;
  console.log(orderId);
  try {
    const order = await Order.findById(orderId);
    console.log("Order:", order);
    if (order) {
      return res.status(200).json(order);
    }
    res.status(204).json({ message: "You don't have anything in your order" });
  } catch (error) {
    createError(404, "Something went wrong");
  }
};
