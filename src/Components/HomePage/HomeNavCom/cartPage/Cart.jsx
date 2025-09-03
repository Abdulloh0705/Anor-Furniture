import React, { useState, useEffect } from 'react';
import './cart.scss'
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Card from '../cardСomp/Card';

const Cart = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : cartItems;
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const handleIncrease = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
    window.location.reload();
  };

  const handleDecrease = (id) => {
    setItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter(item => item.count > 0)
    );
    window.location.reload();
  };

  const handleRemove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    window.location.reload();
  };

  // 🔥 App-dan kelgan clearCart ishlatilmoqda
  const handleClear = () => {
    clearCart();
    window.location.reload();
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page__box">
          <div className="cart-page__infos-box">
            <div className="cart-page__all-title-box">
              <h2 className="cart-page__theme">Tanlangan mahsulotlar</h2>
              <div className="line"></div>

              <div className="cart-page__title-box">
                <div className="cart-page__text-clear">
                  <p className='cart-page__text'>
                    Hozircha {items.length} ta mahsulot tanlagansiz
                  </p>
                  <button
                    className="cart-page__but-clear"
                    onClick={handleClear}
                  >
                    Tozalash
                  </button>
                </div>
              </div>
            </div>

            <div className="cart-page__all-product__box">
              {items.map(item => (
                <div key={item.id} className="cart-page__product-box">
                  <div className="cart-page__product-img__box">
                    <img
                      className='cart-page__product-img'
                      src={item.img}
                      alt={item.title}
                      onClick={() => navigate(`/product/${item.id}`)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div className="cart-page__product-essay__box">
                    <h2
                      className="cart-page__product-title"
                      onClick={() => navigate(`/product/${item.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </h2>
                    <p>{item.text.split(" ").slice(0, 5).join(" ")}</p>
                  </div>

                  <div className="cart-page__product__price-add">
                    <p className="cart-page__product__price">
                      {item.price} so'm
                    </p>

                    <div className="cart-page__counter">
                      <button className='cart-page__counter-min' onClick={() => handleDecrease(item.id)}>-</button>
                      <p className="cart-count">{item.count}</p>
                      <button className='cart-page__counter-max' onClick={() => handleIncrease(item.id)}>+</button>
                    </div>

                    <div className="cart-page__totalPrice__clear-box">
                      <p className='cart-page__totalPrice'>
                        {item.price * item.count} so'm
                      </p>

                      <FaTrash
                        className='cart-page__clear'
                        onClick={() => handleRemove(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-page__card-box">
            <Card items={items}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
