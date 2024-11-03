const imagekit = require("../utility/imagekit");

async function uploadImages(req, res) {
  try {
    const { productImage } = req.body;

    const images = productImage.map(async (img) => {
      const result = await imagekit.upload({
        file: img,
        fileName: `product.jpg`,
        folder: "foodi",
        isPublished: true,
      });
      return result;
    });
      
      const uploadedImages = await Promise.all(images);
      
    res.status(201).json({
      message: "images upload successfully",
      error: false,
      success: true,
      data: uploadedImages,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadImages;
