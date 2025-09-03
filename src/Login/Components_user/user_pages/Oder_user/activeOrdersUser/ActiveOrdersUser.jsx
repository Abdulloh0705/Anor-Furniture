import React, { useState, useEffect } from "react";
import "./activeOrdersUser.scss";
import { useNavigate } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";
const ActiveOrdersUser = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);
  return (
    <div>
      <div className="unpaid-orders">
        <div className="container">
          <div className="unpaid-orders__box">
            {items.length === 0 ? (
              <div className="unpaid-orders__empty">
                <FaRegSadTear className="unpaid-orders__icon" />
                <h3>Hozircha siz hech qanday mahsulot sotib olmagansz</h3>
                <p>Siz hali hech qanday mahsulot tanlamagansiz.</p>
                <a href="" className="unpaid-orders__link">
                  Mahsulotlar bo'limiga qaytish
                </a>
              </div>
            ) : (
              <div className="unpaid-orders__products">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="unpaid-orders__product-box order-user__window-box"
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="unpaid-orders__product-essay__box">
                      <h2 className="unpaid-orders__product-title">
                        {item.title}
                      </h2>
                    </div>
                    <div className="unpaid-orders__product__price-add">
                      <p className="unpaid-orders__product__price">
                        {item.price} so'm
                      </p>
                      <p className="unpaid-orders__totalPrice">
                        {item.price * item.count} so'm
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrdersUser;
