const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order");

router.get("/getOrders", orderController.getOrders);

router.get("/getOrder/:id", orderController.getOrder);

router.post("/postOrder", orderController.postOrder);

module.exports = router;
