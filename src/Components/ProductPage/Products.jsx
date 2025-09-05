import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./product.scss";
import ChekProducts from './chekBox/ChekProducts';
import { getProducts } from './ProductBackend/api'; // 🔑 Mongo API dan olamiz

const Products = ({ addToCart }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartCounts, setCartCounts] = useState({});
  const [hasNavigated, setHasNavigated] = useState(false);
  const [filters, setFilters] = useState({ categories: [], colors: [] }); // 🔹 filtrlash uchun qo‘shildi

  // 🔑 API dan productlarni olish
  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  // 🔑 sessionStorage dan flagni o‘qish
  useEffect(() => {
    const stored = sessionStorage.getItem("hasNavigated");
    if (stored === "true") {
      setHasNavigated(true);
    }
  }, []);

  // 🔑 flag o‘zgarsa sessionStorage ga yozish
  useEffect(() => {
    sessionStorage.setItem("hasNavigated", hasNavigated);
  }, [hasNavigated]);

  // 🔹 Filtrlash
  const filteredProducts = products.filter((p) => {
    const byCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(p.category);
    const byColor =
      filters.colors.length === 0 ||
      p.colors?.some((color) => filters.colors.includes(color));
    return byCategory && byColor;
  });

  const handleAdd = (item) => {
    setCartCounts(prev => ({
      ...prev,
      [item._id]: (prev[item._id] || 0) + 1
    }));
  };

  const handleSubtract = (item) => {
    setCartCounts(prev => {
      const newCount = (prev[item._id] || 0) - 1;
      const updated = { ...prev };
      if (newCount <= 0) {
        delete updated[item._id];
      } else {
        updated[item._id] = newCount;
      }
      return updated;
    });
  };

  const handleAddToCart = (item) => {
    const count = cartCounts[item._id] || 1;
    addToCart({ ...item, count });

    if (!hasNavigated) {
      navigate('/cart');
      setHasNavigated(true);
    }
  };

  return (
    <div className="all">
      <div className="container">
        <div className="all__box">
          <div className="all__search_chek-b">
            {/* 🔹 setFilters berildi */}
            <ChekProducts setFilters={setFilters} />
          </div>
          <div className='products'>
            <div className="products__theme">
              <h2 className="products__th-title">{t('productsPage.title')}</h2>
              <p className="products__th-text">{t('productsPage.subtitle')}</p>
            </div>

            <div className="products__box">
              {filteredProducts.map(item => (
                <div key={item._id} className="products__cards">
                  <Link
                    to={`/product/${item._id}`}
                    className='products__card-link'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="products__cards-c">
                      <img
                        className="products__img"
                        src={`http://localhost:5000${item.img}`}   // 🔑 to‘liq URL
                        alt={item.title}
                      />

                    </div>
                    <div className="products__essey">
                      <h2 className='products__title'>{item.title}</h2>
                      <p className='products__price'>
                        {cartCounts[item._id] && cartCounts[item._id] > 1
                          ? `${item.price}  | ${item.price * cartCounts[item._id]} so'm`
                          : `${item.price} so'm`
                        }
                      </p>
                    </div>
                  </Link>

                  {cartCounts[item._id] ? (
                    <div className="products__action">
                      <div className="products__counter">
                        <button onClick={() => handleSubtract(item)}>-</button>
                        <span>{cartCounts[item._id]}</span>
                        <button onClick={() => handleAdd(item)}>+</button>
                      </div>
                      <button
                        className="products__but small"
                        onClick={() => handleAddToCart(item)}
                      >
                        {t('productsPage.addToCart')}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="products__but"
                      onClick={() => handleAdd(item)}
                    >
                      {t('productsPage.addToCart')}
                    </button>
                  )}
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <p className="no-products">❌ Mahsulot topilmadi</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
