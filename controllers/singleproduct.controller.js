const Product = require("../models/product.model")

// get sigle product detail

exports.getsingleproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.findById(id);

        if (!data) {
            return res.status(404).json({ msg: "product not found" });
        }

        res.status(200).json({ msg: "product find", data })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}