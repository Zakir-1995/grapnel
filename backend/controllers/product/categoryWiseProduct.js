const Product = require("../../models/productModel");

async function categoryWiseProduct(req, res) {
  try {
    const { category } = req.body;

    const products = await Product.find({ category: category });
    res.status(200).json({
      data: products,
      message: "category product",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = categoryWiseProduct;
