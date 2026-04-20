const Product = require("../models/product.model")

// add all products
exports.addProducts = async (req, res) => {
    try {
        const data = await Product.insertMany(req.body)
        res.json({ msg: "data saved", data })
    } catch (error) {
        res.status(500).json({error,msg:"somthing is error"})
    }
}

// get all products

exports.getAllProducts = async (req,res) => {
    try {
        const data = await Product.find();
        res.json({msg:"product get",data})
    } catch (error) {
        res.status(500).json({error})
    }
}