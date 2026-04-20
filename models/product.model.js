
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Img: { type: String, required: true },
    Images: { type: [String], required: true },
    Rating: { type: Number, required: true },
    Reviews: { type: Number, required: true },
    Description: { type: String, required: true },
    Category: { type: String, required: true },
    Brand: { type: String, required: true },
    FullPrice: { type: Number, required: true },
    DiscountPrice: { type: Number, required: true },
    Stock: { type: Number, required: true },
    Features: { type: [String], required: true },
    Specifications: {
        type: Map,
        of: String,
        required: true
    }
});

const Product  =  mongoose.model("Product", productSchema);

module.exports = Product;