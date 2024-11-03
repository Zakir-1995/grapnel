const AddToCart = require("../../models/addToCartModel");

async function countAddToCart(req,res) {
  try {
      const userId = req.userId  
      const count = await AddToCart.countDocuments({ userId })
      return res.status(200).json({
        data: {
          count,
        },
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

module.exports = countAddToCart;