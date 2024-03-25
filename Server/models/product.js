const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    long_desc: String,
    short_desc: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
