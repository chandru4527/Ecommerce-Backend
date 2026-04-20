const express = require("express");
const router = express.Router();

const {getsingleproduct} = require("../controllers/singleproduct.controller")

router.get("/product/:id",getsingleproduct);

module.exports = router
