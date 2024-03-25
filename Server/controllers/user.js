const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");
const { body, validationResult } = require("express-validator");

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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(404, "Not found user"));
    }
    let checkPass = await bcrypt.compareSync(password, user.password);
    if (!checkPass) {
      return next(createError(401, "Email or password incorrect"));
    }
    req.session.isAuthenticated = true;
    req.session._id = user._id;
    console.log("#1:", req.session);
    console.log("#2:", req.sessionID);
    console.log("#3:", "Login success");
    return res
      .status(200)
      .json({ name: user.name, email: user.email, phone: user.phone });
  } catch (err) {
    next(createError(err));
  }
};
