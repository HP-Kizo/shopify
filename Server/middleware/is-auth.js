const { createError } = require("../utils/error");

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return createError(401, "Not authenticated");
  }
  console.log("User logged in");
  next();
};
