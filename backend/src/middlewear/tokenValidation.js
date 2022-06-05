const jwt = require("jsonwebtoken");
const User = require("../models/User");

const tokenValidation = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    // console.log(token);
    // const token = req.body.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    res.status(200).send({ message: "User is valid" });
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = tokenValidation;
