const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String },
    products: [
      {
        _id: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        image: { type: String },
        price: { type: Number },
        name: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
