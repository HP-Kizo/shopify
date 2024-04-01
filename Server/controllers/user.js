const User = require("../models/user");
const bcrypt = require("bcrypt");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { createError } = require("../utils/error");
const { body, validationResult } = require("express-validator");
const { sendMail, content } = require("../middleware/sendMail");

////// Create  -------------------------------------------------------------------------------------------------/////
exports.postRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400, errors.array()[0].msg));
  }
  const { name, email, password, phone } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return next(createError(404, "Email already exists"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hash, phone });
    const savedUSer = await newUser.save();

    if (savedUSer) {
      return res
        .status(200)
        .json({ savedUSer, success: "User has been created." });
    }
  } catch (err) {
    next(createError(err));
  }
};

////// Read  -------------------------------------------------------------------------------------------------/////
exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400, errors.array()[0].msg));
  }
  const emailLogin = req.body.email;
  const passwordLogin = req.body.password;
  try {
    const user = await User.findOne({ email: emailLogin });
    if (!user) {
      return next(createError(404, "Not found user"));
    }
    let checkPass = await bcrypt.compareSync(passwordLogin, user.password);
    if (!checkPass) {
      return next(createError(401, "Email or password incorrect"));
    }
    req.session.isAuthenticated = true;
    req.session._id = user._id;
    const { password, ...other } = user._doc;
    const userCart = await Cart.findOne({ userId: other._id });
    console.log("#1:", req.session);
    console.log("#2:", req.sessionID);
    console.log("#3:", "Login success");
    return res
      .status(200)
      .json({ user: other, cart: userCart ? userCart.products : [] });
  } catch (err) {
    next(createError(err));
  }
};

exports.getLogout = async (req, res, next) => {
  console.log("#End:", req.sessionID);
  req.session.destroy();
  console.log("#Logout: Logout success");
  return res.status(200).json({ message: "Logout success" });
};

//  -----ADMIN---------------------------------------------------------------------------------------------------

exports.adminLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400, errors.array()[0].msg));
  }
  const emailLogin = req.body.email;
  const passwordLogin = req.body.password;
  try {
    const user = await User.findOne({ email: emailLogin, role: "admin" });
    if (!user) {
      return next(createError(400, "Not found user"));
    }

    let checkPass = await bcrypt.compareSync(passwordLogin, user.password);
    if (!checkPass) {
      return next(createError(401, "Email or password incorrect"));
    }
    const { password, ...other } = user._doc;

    req.session.isAuthenticated = true;
    req.session.adminId = other._id;
    req.session.adminRole = other.role;
    console.log("#1:", req.session);
    console.log("#2:", req.sessionID);
    console.log("#3:", "Login success");
    // mail.sendMail(other.email, "Success", "Login success");
    res.status(200).json({ user: other });
  } catch (error) {
    return next(createError(500, "Error when login, please try again later"));
  }
};

exports.adminRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400, errors.array()[0].msg));
  }
  const { name, email, password, phone } = req.body.data;

  const checkEmail = await User.findOne({ email: email });
  try {
    if (checkEmail) {
      return createError(409, "Email already exists");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);
      const newUser = new User({
        name,
        email,
        password: hash,
        phone,
        role: "admin",
      });
      newUser
        .save()
        .then((savedUser) => {
          return res.status(200).json({ success: "Admin has been created." });
        })
        .catch((err) => createError(500, "Internal Server Error"));
    }
  } catch (err) {
    return createError(500, "Internal Server Error");
  }
};

exports.adminLogout = async (req, res, next) => {
  console.log("#End:", req.sessionID);
  req.session.destroy();
  console.log("#Logout: Logout success");
  return res.status(200).json({ message: "Logout success" });
};
