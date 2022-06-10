const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    // ProductId:{
    //     type: String,
    //     required: true,
    // },
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Image: {
      type: String,
    },
    // Category: {
    //   type: String,
    //   required: true,
    //   enum: "ProdCategories",
    // },
    Price: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
      default: null,
    },
    Manufacturer: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
