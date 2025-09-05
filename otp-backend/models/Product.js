import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  text: String,
  img: String,
  pls1: String,
  pls2: String,
  pls3: String,
  price: Number,
  colors: [String],
});

export default mongoose.model("Product", productSchema);
