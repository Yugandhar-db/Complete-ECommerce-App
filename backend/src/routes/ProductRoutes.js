const router = require("express").Router();
const Products = require("../models/Products");

router
  .route("/")
  .get((req, res) => {
    res.send("You are on Products Page...!");
  })
  .post(async (req, res) => {
    console.log(req.body);
    const NewProduct = new Products(req.body);
    await NewProduct.save();
    res.send("Succesfully Added the Product...!");
    // res.redirect('/')
  });

router
  .route("/:name")
  .get(async (req, res) => {
    const item = await Products.findOne({ Title: req.params.name });
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
