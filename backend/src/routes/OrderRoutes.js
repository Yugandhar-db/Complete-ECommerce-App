const router = require("express").Router();
const Cart = require("../models/Cart");
const auth = require("../middlewear/auth");
const Products = require("../models/Products");
const User = require("../models/User");
const Orders = require("../models/Orders");
const { mongoose } = require("mongoose");

router.route("/").get(auth, async (req, res) => {
  const UserOrders = await Orders.find({ userid: req.user._id }).populate(
    "items.item"
  );
  res.send(UserOrders);
});

router.route("/order").post(auth, async (req, res) => {
  // console.log(req.body.data);
  const NewOrder = new Orders({ userid: req.user._id, items: req.body.data });
  NewOrder.save();
  await Cart.deleteMany({ userid: req.user._id });
  console.log(NewOrder);
  res.status(200).send("Order Placed Succesfully...!");
});

module.exports = router;
