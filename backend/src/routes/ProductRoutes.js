const router = require("express").Router();
const mongoose = require("mongoose");
const Products = require("../models/Products");
const auth = require("../middlewear/auth");

router
  .route("/")
  .get(auth, function (req, res) {
    Products.find({}, function (err, data) {
      let allProducts = data.map((product) => {
        return product;
      });
      // console.log(typeof allProducts);
      res.send(allProducts);
    });
  })
  .post(async (req, res) => {
    console.log(req.body);
    const NewProduct = new Products(req.body);
    await NewProduct.save();
    res.send("Succesfully Added the Product...!");
    // res.redirect('/')
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const item = await Products.findOne({ _id: id });
    //   console.log(req.params.name)
    res.send(`${item.Title} + ${item.Price}`);
  })
  .delete(async (req, res) => {
    const item = await Products.deleteOne({ Title: req.params.name });
    res.send("Succesfully Deleted...!");
  })
  .put(async (req, res) => {
    const item = await Products.findOne({ Title: req.params.name });
    Object.assign(item, req.body);
    item.save();
    res.send("Succesfully Updated...!");
  });

module.exports = router;
