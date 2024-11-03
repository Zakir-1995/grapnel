const Product = require("../../models/productModel");

async function filterCategoryList(req, res) {
  try {
    const { filterCategory } = req?.body || [];
    const product = await Product.find({
      category: { $in: filterCategory },
    });
    return res.status(200).json({
      data: product,
      message: "Category Product list",
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

module.exports = filterCategoryList;
