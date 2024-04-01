const express = require("express");
const cartController = require("../controllers/cart");

const router = express.Router();

router.post("/create", cartController.createCart);

router.get("/getCarts", cartController.getCarts);

router.put("/updateCart", cartController.updateCart);

module.exports = router;
