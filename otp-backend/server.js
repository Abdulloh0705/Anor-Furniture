require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Xotirada OTP saqlash
const otpStore = new Map();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Random 6 xonali kod
const genCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1) OTP yuborish
app.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.toLowerCase().endsWith('@gmail.com')) {
      return res.status(400).json({ ok: false, msg: 'Faqat @gmail.com email qabul qilinadi' });
    }

    const code = genCode();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 daqiqa amal qiladi
    otpStore.set(email.toLowerCase(), { code, expiresAt, attempts: 0 });

    // Email yuborish
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Sizning OTP kodingiz',
      text: `Kodingiz: ${code}. U 5 daqiqa davomida amal qiladi.`,
    });

    res.json({ ok: true, msg: 'Kod emailga yuborildi' });
  } catch (err) {
    console.error("Email yuborishda xatolik:", err);
    res.status(500).json({ ok: false, msg: 'Xatolik: kod yuborilmadi' });
  }
});

// 2) OTP tekshirish
app.post('/verify-otp', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ ok: false, msg: 'Email va kod shart' });
  }

  const record = otpStore.get(email.toLowerCase());
  if (!record) return res.status(400).json({ ok: false, msg: 'Avval kod yuboring' });

  // Muddat tugaganmi?
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return res.status(400).json({ ok: false, msg: 'Kod muddati tugagan' });
  }

  // Urinish limiti
  if (record.attempts >= 5) {
    otpStore.delete(email.toLowerCase());
    return res.status(429).json({ ok: false, msg: 'Urinishlar limiti oshdi' });
  }

  // Kodni tekshirish
  if (code.trim() !== record.code) {
    record.attempts += 1;
    otpStore.set(email.toLowerCase(), record);
    return res.status(400).json({ ok: false, msg: 'Kod noto‘g‘ri' });
  }

  // Muvaffaqiyatli
  otpStore.delete(email.toLowerCase());
  res.json({ ok: true, msg: 'Tasdiqlandi' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ OTP server running on :${PORT}`));
