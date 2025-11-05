import mongoose from "mongoose";
const prodcutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true },
    thumbnail: { type: String, required: true }

})
const Product = mongoose.model("product", prodcutSchema);
export default Product;