import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./product.scss";
import product from './ProductBackend/product';
import ChekProducts from './chekBox/ChekProducts';

const Products = ({ addToCart }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [cartCounts, setCartCounts] = useState({});
  const [hasNavigated, setHasNavigated] = useState(false);

  // 🔑 localStorage dan flagni o‘qish
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


  const handleAdd = (item) => {
    setCartCounts(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const handleSubtract = (item) => {
    setCartCounts(prev => {
      const newCount = (prev[item.id] || 0) - 1;
      const updated = { ...prev };
      if (newCount <= 0) {
        delete updated[item.id];
      } else {
        updated[item.id] = newCount;
      }
      return updated;
    });
  };

  const handleAddToCart = (item) => {
    const count = cartCounts[item.id] || 1;
    addToCart({ ...item, count });

    // 🔑 faqat birinchi marta navigate qiladi
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
            <ChekProducts />
          </div>

          <div className='products'>
            <div className="products__theme">
              <h2 className="products__th-title">{t('productsPage.title')}</h2>
              <p className="products__th-text">{t('productsPage.subtitle')}</p>
            </div>

            <div className="products__box">
              {product.map(item => (
                <div key={item.id} className="products__cards">
                  <Link
                    to={`/product/${item.id}`}
                    className='products__card-link'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="products__cards-c">
                      <img className='products__img' src={item.img} alt={item.title} />
                    </div>
                    <div className="products__essey">
                      <h2 className='products__title'>{item.title}</h2>
                      <p className='products__price'>
                        {cartCounts[item.id] && cartCounts[item.id] > 1
                          ? `${item.price}  | ${item.price * cartCounts[item.id]} so'm`
                          : `${item.price} so'm`
                        }
                      </p>
                    </div>
                  </Link>

                  {cartCounts[item.id] ? (
                    <div className="products__action">
                      <div className="products__counter">
                        <button onClick={() => handleSubtract(item)}>-</button>
                        <span>{cartCounts[item.id]}</span>
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
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
