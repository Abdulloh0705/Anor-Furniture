import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./userInfo.scss";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();

  // Boshlang'ich ma'lumotlarni localStorage dan o'qish yoki default qiymatlar
  const initialData = JSON.parse(localStorage.getItem("userInfo")) || {
    surname: "",
    name: "",
    fatherName: "",
    email: "",
    phone: "",
  };

  const [savedData, setSavedData] = useState(initialData);
  const [formData, setFormData] = useState(initialData);
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  // Input o'zgarishi
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    checkForChanges(updatedData);
  };

  // Email o'zgarishi va validatsiyasi
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const updatedData = { ...formData, email: value };
    setFormData(updatedData);
    checkForChanges(updatedData);

    if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
      setEmailError("");
    } else {
      setEmailError("Faqat @gmail.com bilan tugaydigan manzil kiriting");
    }
  };

  // Telefon o'zgarishi
  const handlePhoneChange = (value) => {
    const updatedData = {
      ...formData,
      phone: value,
    };
    setFormData(updatedData);
    checkForChanges(updatedData);
  };

  // O'zgarishlarni tekshirish (saqlangan ma'lumotlar bilan taqqoslash)
  const checkForChanges = (newData) => {
    const changed = Object.keys(savedData).some(
      (key) => newData[key] !== savedData[key]
    );
    setIsChanged(changed);
  };

  // Saqlash funksiyasi
  const handleSave = () => {
    // Majburiy maydonlarni tekshirish
    if (
      !formData.surname.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setFormError("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }
    // Email xatolarini tekshirish
    if (emailError) {
      setFormError("Elektron pochta manzilingiz noto‘g‘ri.");
      return;
    }

    // Ma'lumotlarni saqlash
    setSavedData(formData);
    localStorage.setItem("userInfo", JSON.stringify(formData));
    setIsChanged(false);
    setFormError("");
  };

  // Bekor qilish - formni saqlangan ma'lumotlarga qaytarish
  const handleCancel = () => {
    setFormData(savedData);
    setIsChanged(false);
    setEmailError("");
    setFormError("");
  };

  // Log out funksiyasi - token ni o'chirish va login sahifasiga o'tish
  const handleLogout = () => {
    localStorage.removeItem("token");
    // userInfo ni o'chirishni olib tashladik, shuning uchun logoutda ham saqlanadi
    navigate("/login");
  };

  // Component birinchi marta yuklanganda localStorage ni o'qish
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userInfo"));
    if (storedData) {
      setSavedData(storedData);
      setFormData(storedData);
      setIsChanged(false);
      setFormError("");
      setEmailError("");
    }
  }, []);

  return (
    <div className="userInfo">
      <div className="container">
        <div className="userInfo__box">
          <div className="userInfo__essay">
            <h2 className="userInfo__title">Ma'lumotlarim</h2>
          </div>

          <div className="userInfo__all-input__box">
            <div className="userInfo__userName-box">
              <div className="userInfo__Surname-box">
                <span>Familiya</span>
                <input
                  type="text"
                  placeholder="Familya"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
              <div className="userInfo__name-box">
                <span>Ism</span>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="userInfo__h-f-name-box">
                <span>Sharif</span>
                <input
                  type="text"
                  placeholder="Sharif"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="userInfo__phone-gmail__box">
              <div className="userInfo__gmail-box">
                <span>Elektron pochta</span>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className={emailError ? "input-error" : ""}
                />
                {emailError && (
                  <small className="error-message">{emailError}</small>
                )}
              </div>

              <div className="userInfo__phone-box">
                <span>Telefon raqami</span>
                <PhoneInput
                  country={"uz"}
                  onlyCountries={["uz", "ru", "us"]}
                  masks={{
                    uz: "(..) ...-..-..",
                    ru: "(...)-...-..-..",
                    us: "(...)-...-....",
                  }}
                  placeholder="+998 (__) ___-__-__"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disableCountryCode={false}
                  countryCodeEditable={false}
                  inputClass="form__phone-input"
                  inputProps={{ name: "phone", id: "phone" }}
                />
              </div>
            </div>

            <div className="userInfo__log-out_save__box">
              <div className="userInfo__log-out__box">
                <button className="userInfo__log-out" onClick={handleLogout}>
                  log out
                </button>
              </div>

              {formError && <p className="form-error-message">{formError}</p>}

              {isChanged && (
                <div className="userInfo__save-box">
                  <button
                    className="userInfo__cancellation"
                    onClick={handleCancel}
                  >
                    Bekor Qilish
                  </button>
                  <button className="userInfo__save" onClick={handleSave}>
                    Saqlash
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
