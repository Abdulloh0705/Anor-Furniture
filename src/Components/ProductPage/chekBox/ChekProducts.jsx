import React, { useState } from 'react';
import './chekProducts.scss';

const ChekProducts = ({ setFilters }) => {
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

  const adminColors = [
    "#ff0000",
    "#0000ff",
    "#00ff00",
    "#ffffff",
    "#000000",
    "#ffff00"
  ];

  // kategoriya toggle qilish
  const toggleCategory = (item) => {
    const updated = selectedCategories.includes(item)
      ? selectedCategories.filter((c) => c !== item)
      : [...selectedCategories, item];
    setSelectedCategories(updated);
    if (setFilters) {
      setFilters((prev) => ({ ...prev, categories: updated }));
    }
  };

  // rang toggle qilish
  const toggleColor = (name) => {
    const updated = selectedColors.includes(name)
      ? selectedColors.filter((c) => c !== name)
      : [...selectedColors, name];
    setSelectedColors(updated);
    if (setFilters) {
      setFilters((prev) => ({ ...prev, colors: updated }));
    }
  };

  // Tozalash
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    if (setFilters) {
      setFilters({ categories: [], colors: [] });
    }
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
                {/* Admin ranglari */}
                {adminColors.map((color, index) => (
                  <li key={index + colors.length} className="chek__list-item">
                    <label className="color-label">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                      />
                      <span
                        className="color-box"
                        style={{ backgroundColor: color }}
                      ></span>
                      {color}
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
