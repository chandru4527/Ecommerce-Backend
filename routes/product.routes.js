const express = require("express");
const router = express.Router();

const {addProducts, getAllProducts} = require("../controllers/product.controller")

router.post("/",addProducts);
router.get("/all",getAllProducts);

module.exports = router