import Product from "../Model/productsModel.js"

export const allproduct = async (req, res) => {
    try {
        const product = await Product.find().sort({ id: 1 })
        res.status(200).json({
            status: "success",
            products: product
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

export const singleProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ id: Number(id) })
        res.status(200).json({
            status: "success",
            products: product
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}