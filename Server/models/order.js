const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
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
    total: { type: Number, required: true },
    information: { type: Object, required: true },
    status: {
      type: String,
      enum: ["Đang xử lý", "Đã giao hàng", "Hủy bỏ"],
      default: "Đang xử lý",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
