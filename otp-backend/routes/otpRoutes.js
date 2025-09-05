import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();
const otpStore = new Map();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Random 6 xonali kod
const genCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1) OTP yuborish
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.toLowerCase().endsWith("@gmail.com")) {
      return res.status(400).json({ ok: false, msg: "Faqat @gmail.com qabul qilinadi" });
    }

    const code = genCode();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(email.toLowerCase(), { code, expiresAt, attempts: 0 });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Sizning OTP kodingiz",
      text: `Kodingiz: ${code}. 5 daqiqa amal qiladi.`,
    });

    res.json({ ok: true, msg: "Kod emailga yuborildi" });
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Kod yuborilmadi" });
  }
});

// 2) OTP tekshirish
router.post("/verify-otp", (req, res) => {
  const { email, code } = req.body;
  const record = otpStore.get(email.toLowerCase());

  if (!record) return res.status(400).json({ ok: false, msg: "Avval kod yuboring" });
  if (Date.now() > record.expiresAt) return res.status(400).json({ ok: false, msg: "Kod muddati tugagan" });
  if (record.code !== code.trim()) return res.status(400).json({ ok: false, msg: "Kod noto‘g‘ri" });

  otpStore.delete(email.toLowerCase());
  res.json({ ok: true, msg: "Tasdiqlandi" });
});

export default router;
