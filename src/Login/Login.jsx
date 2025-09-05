import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('email'); // "email" -> "code"
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // 1️⃣ Kod yuborish
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@gmail.com')) {
      setError('Faqat @gmail.com email qabul qilinadi.');
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.ok) {
        setStep('code');
        setError('');
      } else {
        setError(data.msg || 'Kod yuborishda xatolik.');
      }
    } catch (err) {
      setError('Server bilan aloqa yo‘q.');
    }
  };

  // 2️⃣ Kodni tekshirish
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (data.ok) {
        if (email === 'abdullohxojiakbarov674@gmail.com') {
          login('admin');
          navigate('/admin');
        } else {
          login('user');
          navigate('/profile');
        }
      } else {
        setError(data.msg || 'Kod noto‘g‘ri.');
      }
    } catch (err) {
      setError('Server bilan aloqa yo‘q.');
    }
  };

  // 🔄 Boshidan boshlash
  const handleReset = () => {
    setEmail('');
    setCode('');
    setStep('email');
    setError('');
  };

  return (
    <div className="login">
      <form className="form">
        <p className="form-title">Sign in with Gmail</p>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {step === 'email' && (
          <>
            <div className="input-container">
              <input
                placeholder="Enter Gmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="submit" onClick={handleSendOtp}>
              Send Code
            </button>
          </>
        )}

        {step === 'code' && (
          <>
            <div className="input-container">
              <input
                placeholder="Enter code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button className="submit" onClick={handleVerifyOtp}>
              Verify Code
            </button>
            <button
              type="button"
              className="submit"
              style={{ background: 'gray', marginTop: '10px' }}
              onClick={handleReset}
            >
              Boshidan boshlash
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
