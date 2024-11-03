const Product = require("../../models/productModel");
const cloudinary = require("../../utility/cloudinary");

async function deleteProductController(req, res) {
  const { _id } = req.body;
  try {
    const product = await Product.findById({ _id: _id });

    product.productImage.flat().map(async (img) => {
      const imgId = img.public_id;
      await cloudinary.uploader.destroy(imgId, {
        folder: "grapnel",
      });
    });

    await Product.deleteOne({ _id: _id });
    return res.status(200).json({
      message: "Product Deleted Successfully",
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

module.exports = deleteProductController;
