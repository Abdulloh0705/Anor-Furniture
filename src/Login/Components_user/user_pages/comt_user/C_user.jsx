import React, { useEffect, useState } from "react";
import "./c_user.scss";
import { FaChevronRight, FaRegSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";

const C_user = () => {
  const [comments, setComments] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(saved);
  }, []);
  useEffect(() => {
    if (selectedContent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedContent]);

  const handleDelete = (index) => {
    const updated = comments.filter((_, i) => i !== index);
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
  };

  return (
    <div className="c_user">
      <div className="container">
        <div className="c_user__box">
          <div className="c_user__essay">
            <h2 className="c_user__title">Mening Sharhlarim</h2>
          </div>

          <div className="c_user__window-box">
            {comments.length > 0 ? (
              comments.map((c, idx) => (
                <div key={idx} className="c_user__comment">
                  <div className="c_user-tel-comd">
                    <p className="c_user__tel">
                      <strong>+{c.phone}</strong>
                    </p>

                    {/* 110 ta harfdan oshsa qisqartirish */}
                    <p className="c_user__comend">
                      {c.content.length > 110
                        ? c.content.slice(0, 100) + "..."
                        : c.content}
                    </p>

                    {/* Tugma faqat 110 dan oshsa chiqadi */}
                    {c.content.length > 110 && (
                      <button
                        className="c_user__see-more"
                        onClick={() => setSelectedContent(c.content)}
                      >
                        Barchasini ko‘rish <FaChevronRight />
                      </button>
                    )}
                  </div>

                  <div className="c_user__data-del">
                    <p className="c_user__date">{c.date}</p>
                    <button
                      className="c_user__delete"
                      onClick={() => handleDelete(idx)}
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="unpaid-orders__empty">
                <FaRegSadTear className="unpaid-orders__icon" />
                <h3>Hozircha sharhlar mavjud emas</h3>
                <p>Siz hali hech qanday sharh qoldirmadingiz.</p>
                <Link to="/#about" className="unpaid-orders__link">
                  Sharhingizni yozib qoldiring
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedContent && (
        <div
          className="c_user__modal"
          onClick={() => setSelectedContent(null)} // tashqariga bossang yopiladi
        >
          <div
            className="c_user__modal-content"
            onClick={(e) => e.stopPropagation()} // ichida bossang yopilmaydi
          >
            <p className="c_user__modal-text">{selectedContent}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default C_user;
