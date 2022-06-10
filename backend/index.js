const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const verify = require("./src/middlewear/tokenValidation");

dotenv.config();

const ProductRoutes = require("./src/routes/ProductRoutes");
const CartRoutes = require("./src/routes/CartRoutes");
const UserRoutes = require("./src/routes/UserRoutes");
const tokenValidation = require("./src/middlewear/tokenValidation");
const OrderRoutes = require("./src/routes/OrderRoutes");

mongoose.connect("mongodb://localhost:27017/CompleteECommerceAPP", {
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", ProductRoutes);
app.use("/cart", CartRoutes);
app.use("/user", UserRoutes);
app.use("/orders", OrderRoutes);

app.get("/", (req, res) => {
  res.send("Hey You Just Got Started...!");
});

app.get("/verify", verify);

app.listen(5000, () => {
  console.log("Server Started...!");
});
