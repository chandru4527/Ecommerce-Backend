const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;