import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🔹 Barcha mahsulotlarni olish
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔹 Yangi mahsulot qo‘shish
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Bitta mahsulotni yangilash
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 🔹 O‘chirish
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
