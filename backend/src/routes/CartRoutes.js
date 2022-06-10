const router = require("express").Router();
const Cart = require("../models/Cart");
const auth = require("../middlewear/auth");
const Products = require("../models/Products");
const User = require("../models/User");
const { mongoose } = require("mongoose");

router
  .route("/")
  .get(auth, async (req, res) => {
    const UserItems = await Cart.find({ userid: req.user._id }).populate(
      "item"
    );

    // console.log(UserItems);
    res.send(UserItems);
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

    // console.log(typeof ItemNames);
    // const result = async function (list) {
    //   let ItemNames = [];
    //   await list.map(async (e, id) => {
    //     const Product = await Products.findById(e);
    //     console.log([Product.Title, id]);
    //     ItemNames[id] = Product.Title;
    //   });
    //   return ItemNames;
    // };

    // const final = await result(UserItems);

    // console.log(final);
    // res.write(req.user.username);
    res.send({ itemIDs: UserItems });
  })
  .post(auth, async (req, res) => {
    const ProdId = mongoose.Types.ObjectId(req.body.items);

    const UserCart = await Cart.findOneAndUpdate(
      { userid: req.user._id, item: ProdId },
      { $inc: { count: 1 }, item: ProdId },
      { upsert: true, new: true }
    );

    // const UserCart = await Cart.findOneAndUpdate(
    //   { userid: req.user._id },
    //   {
    //     $push: { items: TempProd._id },
    //   },
    //   { new: true }
    // );

    // const UserCart = await Cart.findOne({ userid: req.user._id });

    // UserCart.save();
    console.log(UserCart);

    res.send(UserCart);
  });

module.exports = router;
