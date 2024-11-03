const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    productImage: [
      {
        type: Array,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
