// const mongoose = require('mongoose');

const { default: mongoose, mongo, model } = require("mongoose");

const ItemCartSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    count: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("CartItem", ItemCartSchema);

module.exports = CartItem;
