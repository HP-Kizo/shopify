const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { check, body, validator } = require("express-validator");

const validateData = {
  validateLogin: [
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("Invalid password"),
  ],
  validateRegister: [
    body("name").not().isEmpty().withMessage("Invalid Username"),
    check("email", "Invalid email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("Invalid password"),
    body("phone")
      .isLength({ min: 8 })
      .trim()
      .withMessage("Invalid phone number"),
  ],
};

router.post("/login", validateData.validateLogin, userController.postLogin);

router.post("/register", validateData.validateRegister);

router.get("/logout", userController.getLogout);

//------ADMIN ------------------------

router.post(
  "/admin/login",
  validateData.validateLogin,
  userController.adminLogin
);

router.post(
  "/admin/register",
  userController.postRegister,
  userController.adminRegister
);

router.get("/admin/logout", userController.adminLogout);


//------ADVISOR ------------------------

router.post("advisor/login", userController.adminLogin);

module.exports = router;
