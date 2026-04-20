require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieparser = require("cookie-parser")

const app = express()


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());
app.use(cookieparser())

// port 
const port = process.env.PORT || 3000;

// DB
connectDB();

// Routes

// ---- 1.user routers
const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

// ---- 2.product routers 
const productRouters = require("./routes/product.routes");
app.use("/products", productRouters);

//  ---- 3.get single product
const singleproductrouter = require("./routes/singleproduct.routes")
app.use("/products", singleproductrouter);

// ---- 4.cart routers
const cartrouter = require("./routes/cart.routes")
app.use("/cart", cartrouter);

//   ----- auth me router for admin page 
const authroutes = require("./routes/auth.routes")
app.use("/auth",authroutes);


app.listen(port, "0.0.0.0", () => {
  console.log("Server running", port);
});
