const express = require("express");

const router = express.Router();

const { addTocart, getCarts, removeitem, updateqty } = require("../controllers/cart.controller");

const { auth } = require("../middleware/auth.middleware");

router.post("/add", auth, addTocart);
router.get("/", auth, getCarts);
router.delete("/remove", auth, removeitem);
router.put("/update", auth, updateqty);

module.exports = router;