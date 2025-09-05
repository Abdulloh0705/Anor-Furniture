// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Fayl yo‘lini olish (__dirname uchun)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env faylni yuklash
dotenv.config();

// Express app yaratish
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Statik fayllar (rasmlar yuklanadigan joy)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// 🔹 MongoDB ga ulanish
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ====================
// PRODUCT ROUTES
// ====================
app.use("/api/products", productRoutes);

// ====================
// OTP ROUTES
// ====================

// Xotirada OTP saqlash
const otpStore = new Map();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // .env dagi EMAIL_USER
    pass: process.env.EMAIL_PASS, // .env dagi EMAIL_PASS (App Password bo‘lishi kerak)
  },
});

// Random 6 xonali kod
const genCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 1) OTP yuborish
app.post("/api/otp/send", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.toLowerCase().endsWith("@gmail.com")) {
      return res
        .status(400)
        .json({ ok: false, msg: "Faqat @gmail.com email qabul qilinadi" });
    }

    const code = genCode();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 daqiqa amal qiladi
    otpStore.set(email.toLowerCase(), { code, expiresAt, attempts: 0 });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Sizning OTP kodingiz",
      text: `Kodingiz: ${code}. U 5 daqiqa davomida amal qiladi.`,
    });

    res.json({ ok: true, msg: "Kod emailga yuborildi" });
  } catch (err) {
    console.error("Email yuborishda xatolik:", err);
    res.status(500).json({ ok: false, msg: "Xatolik: kod yuborilmadi" });
  }
});

// 2) OTP tekshirish
app.post("/api/otp/verify", (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ ok: false, msg: "Email va kod shart" });
  }

  const record = otpStore.get(email.toLowerCase());
  if (!record)
    return res.status(400).json({ ok: false, msg: "Avval kod yuboring" });

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return res.status(400).json({ ok: false, msg: "Kod muddati tugagan" });
  }

  if (record.attempts >= 5) {
    otpStore.delete(email.toLowerCase());
    return res.status(429).json({ ok: false, msg: "Urinishlar limiti oshdi" });
  }

  if (code.trim() !== record.code) {
    record.attempts += 1;
    otpStore.set(email.toLowerCase(), record);
    return res.status(400).json({ ok: false, msg: "Kod noto‘g‘ri" });
  }

  otpStore.delete(email.toLowerCase());
  res.json({ ok: true, msg: "Tasdiqlandi" });
});

// ====================
// TEST ROUTE
// ====================
app.get("/", (req, res) => {
  res.send("🚀 Anor Furniture API ishlayapti");
});

// ====================
// SERVER START
// ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
