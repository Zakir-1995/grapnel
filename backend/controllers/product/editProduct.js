const Product = require("../../models/productModel");
const uploadProductPermission = require("../../helper/index");
const cloudinary = require("../../utility/cloudinary");

async function editProductController(req, res) {
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
      productId,
    } = req.body;

      const product = await Product.findById({ _id: productId });
 
        product.productImage.flat().map(async (img) => {
          const imgId = img.public_id;
          await cloudinary.uploader.destroy(imgId, {
            folder: "grapnel",
          });
        });
 



    const images = productImage.map(async (img) => {
      const result = await cloudinary.uploader.upload(img, {
        folder: "grapnel",
      });
      return result;
    });

    const uploadedImages = await Promise.all(images);

    await Product.findByIdAndUpdate(
      { _id: product._id },
      {
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
      }
    );

    res.status(201).json({
      message: "Update Product successfully",
      error: false,
      success: true,
      //   data: saveProduct,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = editProductController;
