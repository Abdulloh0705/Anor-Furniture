import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./postFrom.scss";
import { useNavigate } from "react-router-dom";

const PostForm = ({ onNewComment }) => {
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim() || !content.trim()) {
      setError("Iltimos, barcha maydonlarni to‘ldiring!");
      setSuccess("");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("comments")) || [];
    const newComment = {
      phone,
      content,
      date: new Date().toLocaleString()
    };
    saved.push(newComment);
    localStorage.setItem("comments", JSON.stringify(saved));
    if (onNewComment) {
      onNewComment(newComment);
    }

    const token = "8432443962:AAEAOJ886p6As35xrfLMV7CYuGX254zNaJI";
    const chat_id = "-1002523939469"; 
    const my_text = `📞 Telefon raqami: +${phone}\n📝 Fikr: ${content}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
//  !!!!! BU YERNI O‘ZGARTIRMA !!!!!
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: my_text }),
      });

      if (res.ok) {
        setSuccess("Xabar muvaffaqiyatli yuborildi!");
        setPhone("");
        setContent("");
        setError("");
        navigate("/profile");
      } else {
        const errMsg = await res.json();
        console.error("Telegram javobi:", errMsg);
        setError("Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
        setSuccess("");
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setError("Server bilan bog‘lanishda xatolik yuz berdi.");
      setSuccess("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group phone__wrapper">
        <PhoneInput
          country={"uz"}
          onlyCountries={["uz", "ru", "us"]}
          masks={{
            uz: "(..) ...-..-..",
            ru: "(...)-...-..-..",
            us: "(...)-...-....",
          }}
          placeholder="+998 (__) ___-__-__"
          value={phone}
          onChange={(value) => setPhone(value)}
          disableCountryCode={false}
          countryCodeEditable={false}
          inputClass="form__phone-input"
          inputProps={{ name: "phone", id: "phone" }}
        />
      </div>

      <div className="form__group">
        <textarea
          className="form-group_input"
          id="content"
          placeholder=" "
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setContent(e.target.value);
            }
          }}
        />
        <p style={{ fontSize: "14px", color: "#666", position: "absolute", right: "20px", bottom: '-40px' }}>
          {content.length}/500 harf
        </p>
        <label htmlFor="content" className="form__label">Fikringiz</label>
      </div>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>}

      <div className="form-footer">
        <button className="form__but" type="submit">Yuborish</button>
      </div>
    </form>
  );
};

export default PostForm;
