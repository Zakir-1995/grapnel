const Product = require("../../models/productModel")

const detailsProduct = async (req, res) => {
    try {
        const { productId } = req.body  
        const product = await Product.findById({ _id: productId }) 
        res.status(200).json({
            data: product,
            error: false,
            success: true,
            message:"ok"
        })
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success:false
        })
    }
}

module.exports = detailsProduct;