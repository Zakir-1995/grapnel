const AddToCart = require("../../models/addToCartModel");

async function updateAddToCart(req, res) {
  try {
    const { cartProductId } = req?.body;
    const { qty } = req?.body;
      const updateProduct = await AddToCart.updateOne(
        { _id: cartProductId },
        { $set: { ...(qty && {qty: qty}) } }
      ).exec();

    return res.status(201).json({
      data: updateProduct,
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

module.exports = updateAddToCart;
