const express = require("express");
const productController = require("../controllers/product");
const router = express.Router();

router.get("/get-products", productController.getProducts);

router.get("/:productId", productController.getProduct);

router.patch("/update/:productId", productController.postUpdateProduct);

router.post("/add-product", productController.postAddProduct);

router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;
