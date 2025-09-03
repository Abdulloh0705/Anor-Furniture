import React, { useState } from 'react';
import "./user.scss";
import C_user from '../user_pages/comt_user/C_user.jsx';
import O_User from '../user_pages/Oder_user/O_User.jsx';
import UserInfo from '../user_pages/userInfo/UserInfo.jsx';


const User = () => {
  const [activeTab, setActiveTab] = useState("orders"); // boshlang‘ich "Buyurtmalarim"

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <O_User />;
      case "comments":
        return <C_user />;
      case "info":
        return <UserInfo/>;
      default:
        return <div>Hech narsa tanlanmagan</div>;
    }
  };

  return (
    <div className="user">
      <div className="container">
        <div className="user__all-box">

          {/* Chap menyu */}
          <div className="user__item-box">
            <ul className="user__item">
              <li
                className={`user__list ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                Buyurtmalarim
              </li>
              <li
                className={`user__list ${activeTab === "comments" ? "active" : ""}`}
                onClick={() => setActiveTab("comments")}
              >
                Sharhlar
              </li>
              <li
                className={`user__list ${activeTab === "info" ? "active" : ""}`}
                onClick={() => setActiveTab("info")}
              >
                Ma'lumotlarim
              </li>
            </ul>
          </div>
          <div className="user__data-window__box">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
