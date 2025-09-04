import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String },
  img: { type: String },
  pls1: { type: String },
  pls2: { type: String },
  pls3: { type: String },
  price: { type: Number, required: true },
  colors: [String]
});

export default mongoose.model("Product", productSchema);
