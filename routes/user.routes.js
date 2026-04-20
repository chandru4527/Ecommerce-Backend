const express = require("express");
const router = express.Router();

const { signup, login, profile, logout } = require("../controllers/user.controller")

const {auth} = require("../middleware/auth.middleware")

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", auth, profile);

module.exports = router;