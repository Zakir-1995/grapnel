const AddToCart = require("../../models/addToCartModel");

async function addToCartViewProduct(req,res) {
  try {
      const userId = req.userId  
      const allProduct = await AddToCart.find({ userId }).populate("productId");
      return res.status(200).json({
        data:allProduct,
        message: "ok",
        error: false,
        success: true,
      });
  } catch (err) {
    return res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  } 
}

module.exports = addToCartViewProduct;