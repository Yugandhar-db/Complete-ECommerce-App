const router = require("express").Router();
const Cart = require("../models/Cart");
// const Products = require("../models/Products")
const auth = require("../middlewear/auth");
const Products = require("../models/Products");
const { route } = require("express/lib/router");
const User = require("../models/User");

router
  .route("/")
  .get(auth, (req, res) => {
    res.send("You are on Cart Page...!");
  })
  .post(async (req, res) => {
    console.log(req.body);
    const NewProduct = new Cart(req.body);
    await NewProduct.save();
    res.send("Succesfully Added the Cart...!");
    // res.redirect('/')
  });

router
  .route("/add")
  .get(auth, async (req, res) => {
    console.log("Now You can add the products to your cart..!");
    const UserCart = await Cart.findOne({ userid: req.user._id });
    const UserItems = UserCart.items;

    ItemNames = ["E"];
    UserItems.map(async (e) => {
      const Product = await Products.findById(e);
      console.log(Product.Title);
      ItemNames.push(Product.Title);
    });
    // console.log(AllProducts);
    // res.write(req.user.username);
    res.send(ItemNames);
  })
  .post(auth, async (req, res) => {
    const TempProd = await Products.findOne({ Title: req.body.items });

    const UserCart = await Cart.findOneAndUpdate(
      { userid: req.user._id },
      {
        $push: { items: TempProd._id },
      },
      { new: true }
    );
    // UserCart.save();
    console.log(UserCart);

    res.send(UserCart);
  });

module.exports = router;
