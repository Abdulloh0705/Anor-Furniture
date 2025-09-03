import React, { useState } from 'react';
import './chekProducts.scss';

const ChekProducts = () => {
  // tanlanganlarni saqlash uchun state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const categories = [
    "Arganayzer",
    "Sumka toshlar",
    "Yengil temir",
    "Ogir temir",
    "Hurstal",
    "Metrajni koz",
    "Koz",
    "Biser",
    "Leska sim",
    "Zanjir"
  ];

  const colors = [
    { code: "#ff0000", name: "Qizil" },
    { code: "#0000ff", name: "Ko‘k" },
    { code: "#00ff00", name: "Yashil" },
    { code: "#ffffff", name: "Oq" },
    { code: "#000000", name: "Qora" },
    { code: "#ffff00", name: "Sariq" }
  ];

  // kategoriya toggle qilish
  const toggleCategory = (item) => {
    setSelectedCategories(prev =>
      prev.includes(item)
        ? prev.filter(c => c !== item)
        : [...prev, item]
    );
  };

  // rang toggle qilish
  const toggleColor = (name) => {
    setSelectedColors(prev =>
      prev.includes(name)
        ? prev.filter(c => c !== name)
        : [...prev, name]
    );
  };

  // Tozalash
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
  };

  return (
    <div className="chek__products">
      <div className="container">
        <div className="chek__all-box">
          <div className="chek__all-title">
            <p className="chek__title">Filterlar</p>
            <button className="chek__but" onClick={clearFilters}>Tozalash</button>
          </div>

          {/* Mahsulot toifasi */}
          <div className="chek__1-box">
            <div className="chek__box-essay">
              <p className="chek__box-title">Mahsulot toifasi</p>
            </div>

            <div className="chek__dropdown">
              <ul className="chek__item">
                {categories.map((item, index) => (
                  <li key={index} className="chek__list-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(item)}
                        onChange={() => toggleCategory(item)}
                      />
                      <span></span>
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mahsulot rangi */}
          <div className="chek__2-box">
            <div className="chek__box-essay">
              <p className="chek__box-title">Mahsulot rangi</p>
            </div>

            <div className="chek__dropdown">
              <ul className="chek__item">
                {colors.map((color, index) => (
                  <li key={index} className="chek__list-item">
                    <label className="color-label">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color.name)}
                        onChange={() => toggleColor(color.name)}
                      />
                      <span
                        className="color-box"
                        style={{ backgroundColor: color.code }}
                      ></span>
                      {color.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChekProducts;
