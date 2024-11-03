const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    userId: {
      ref:"user",
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AddToCart = mongoose.model("addToCart", addToCartSchema);

module.exports = AddToCart;
