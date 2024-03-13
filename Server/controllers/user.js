const user = require("../models/user");
const User = require("../models/user");

////// Create  -------------------------------------------------------------------------------------------------/////
exports.postLogin = async (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
