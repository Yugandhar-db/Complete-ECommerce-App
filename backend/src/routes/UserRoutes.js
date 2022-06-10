const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const bcrypt = require("bcryptjs");
const auth = require("../middlewear/auth");

router
  .route("/")
  .get((req, res) => {
    res.send("You are on User Page..!");
  })
  .post(async (req, res) => {
    // console.log(req.body);
    const NewUser = new User(req.body);
    await NewUser.save();
    const token = await NewUser.generateAuthToken();
    console.log(token);

    // const UserCart = new Cart({ userid: NewUser._id, items: [] });
    // await UserCart.save();
    // res.write({ NewUser, token });

    res.status(201).send({
      jwt: token,
      message: "Succesfully logged In",
      user: NewUser,
    });
  });

router
  .route("/login")
  .get((req, res) => {
    res.send("You are on login Page...!");
  })
  .post(async (req, res) => {
    const LoggedUser = await User.findOne({ email: req.body.email });
    if (!LoggedUser) res.send("No User exists with entered email..!");
    const verify = await bcrypt.compare(req.body.password, LoggedUser.password);
    if (verify) {
      const token = await LoggedUser.generateAuthToken();
      res.status(200).send({
        jwt: token,
        message: "Succesfully logged In",
        user: LoggedUser,
      });
    } else {
      res.status(201).send("Password doesn't match");
    }
  });

router.route("/logout").post(auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send({ message: "Sucessfully Logged Out..!" });
  } catch (e) {
    res.status(500).send("");
  }
});

module.exports = router;
