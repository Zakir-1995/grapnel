const Product = require("../../models/productModel");
const uploadProductPermission = require("../../helper/index");
const cloudinary = require("../../utility/cloudinary");

async function uploadProductController(req, res) {
  try {
    if (!uploadProductPermission()) {
      throw new Error("Permission denied");
    }

    const {
      productName,
      brandName,
      productImage,
      description,
      price,
      sellingPrice,
      category,
    } = req.body;

    const images = productImage.map(async (img) => {
      const result = await cloudinary.uploader.upload(img, {
        folder: "grapnel",
      });
      return result;
    });

    const uploadedImages = await Promise.all(images);

    const uploadProduct = new Product({
      productName,
      brandName,
      productImage: uploadedImages.map((img) => {
        return {
          public_id: img.public_id,
          url: img.url,
        };
      }),
      description,
      price,
      sellingPrice,
      category,
    });
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadProductController;
