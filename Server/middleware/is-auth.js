const { createError } = require("../utils/error");

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return createError(401, "Not authenticated");
  }
  console.log("User logged in");
  next();
};

exports.checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Giả sử user đã được xác thực và thông tin user được lưu trong req.user

    if (allowedRoles.includes(userRole)) {
      next(); // Cho phép tiếp tục xử lý request
    } else {
      res.status(403).send("Permission denied"); // Không có quyền truy cập
    }
  };
};

exports.checkAdmin = (req, res, next) => {
  console.log(req.session.adminId);
  console.log(req.session.adminRole);

  if (req.session.adminId && req.session.adminRole === "admin") {
    console.log("Check OK");
    // Nếu người dùng là admin, cho phép tiếp tục xử lý request
    next();
  } else {
    // Nếu không phải admin, chuyển hướng hoặc trả về lỗi tùy ý
    console.log("#0: Chưa đăng nhập");
    res.status(403).json({ message: "Permission denied" });
  }
};
