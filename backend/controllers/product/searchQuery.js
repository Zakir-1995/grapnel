const Product = require("../../models/productModel");

async function searchQuery(req, res) {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");
    const product = await Product.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });
    return res.status(200).json({
      data: product,
      message: "Search Product list",
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

module.exports = searchQuery;
