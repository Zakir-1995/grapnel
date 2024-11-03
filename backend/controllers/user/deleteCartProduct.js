const AddToCart = require("../../models/addToCartModel");

async function deleteCartProduct(req, res) {
  try {
    const { cartProductId } = req?.body;

    await AddToCart.deleteOne({ _id: cartProductId });

    return res.status(201).json({
      message: "Product Deleted!",
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

module.exports = deleteCartProduct;
