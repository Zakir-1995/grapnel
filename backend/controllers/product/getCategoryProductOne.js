const Product = require('../../models/productModel')
async function getCategoryProduct(req, res) {
    try {
        const productCategory = await Product.find().distinct("category") 

        let productByCategory = []
        for (category of productCategory) {
            const product = await Product.findOne({ category });
            if (product) {
                productByCategory.push(product);
          }
        }
              res.status(200).json({
                message: "category product",
                data: productByCategory,
                success: true,
                error: false,
              });
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true,
            success:false
        })
    }
}

module.exports = getCategoryProduct;