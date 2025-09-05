import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 🔹 1) Barcha productlarni olish
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 2) Bitta productni olish
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product topilmadi" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 3) Yangi product qo‘shish + file upload
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { title, text, pls1, pls2, pls3, price, colors } = req.body;
    const newProduct = new Product({
      title,
      text,
      img: req.file ? `/uploads/${req.file.filename}` : "",
      pls1,
      pls2,
      pls3,
      price: Number(price),
      colors: colors.split(","),
    });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 4) Productni yangilash
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 5) Productni o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product topilmadi" });
    res.json({ message: "Product o‘chirildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
