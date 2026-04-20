const Cart = require("../models/cart.model");
const Product = require("../models/product.model");


// add carts
exports.addTocart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ msg: "ProductId is required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        let userCart = await Cart.findOne({ userId });

        if (!userCart) {
            userCart = new Cart({
                userId,
                carts: [{ productId, quantity: 1 }]
            });
        } else {
            const cartIndex = userCart.carts.findIndex(
                item => item.productId.toString() === productId.toString()
            );

            if (cartIndex > -1) {
                userCart.carts[cartIndex].quantity += 1;
            } else {
                userCart.carts.push({ productId, quantity: 1 });
            }
        }

        await userCart.save();

        res.json({
            msg: "product added",
            cart: userCart
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
};

// get carts
exports.getCarts = async (req, res) => {
    try {
        const userId = req.user.id
        const usercart = await Cart.findOne({ userId }).populate("carts.productId");

        if (!usercart) {
            return res.json({ carts: [] })
        }

        res.json({
            success: true,
            carts: usercart.carts
        });

    } catch (error) {

    }
}

// remove carts

exports.removeitem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body

        const userCart = await Cart.findOne({ userId });
        userCart.carts = userCart.carts.filter(
            item => item.productId.toString() !== productId.toString()
        )
        await userCart.save();

        res.json({ msg: "item removed", userCart })
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

// update cartes

exports.updateqty = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, action } = req.body;

        const userCart = await Cart.findOne({ userId });

        const cartIndex = userCart.carts.findIndex(item => item.productId.toString() === productId);

        if (cartIndex === -1) {
            return res.status(404).jason({ msg: "Item not found" })
        }

        if (action === "inc") {
            userCart.carts[cartIndex].quantity += 1;
        }

        if (action === "dec") {
            userCart.carts[cartIndex].quantity -= 1;
            if (userCart.carts[cartIndex].quantity <= 0) {
                userCart.carts.splice(cartIndex, 1);
                // userCart.carts[cartIndex].quantity = 1;
            }
        }


        await userCart.save();

        res.json({ msg: "item changed", userCart })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}