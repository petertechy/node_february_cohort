const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String }, // URL for product image
  createdAt: { type: Date, default: Date.now },
});

let ProductModel = mongoose.model(
    "product_collection",
    ProductSchema,
    "product_collection"
)

module.exports = ProductModel;
