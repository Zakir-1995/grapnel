const AddToCart = require("../../models/addToCartModel");

async function addToCart(req, res) {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;
    const isProductAvailable = await AddToCart.findOne({ productId });
    if (isProductAvailable) {
      return res.status(200).json({
        message: "Already Product exist in Add To Cart",
        error: true,
        success: false,
      });
    }

    const payload = {
      productId,
      qty: 1,
      userId: currentUser,
    };
    const newAddToCart = new AddToCart(payload);
    const saveProduct = await newAddToCart.save();

    return res.status(200).json({
      data: saveProduct,
      message: "New Product Added",
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

module.exports =addToCart
