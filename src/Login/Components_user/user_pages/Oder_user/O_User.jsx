import React, { useState } from 'react';
import './oder_user.scss';
import AllOrdersUser from './allOrdersUser/AllOrdersUser';
import UnpaidOrdersUser from './unpaidOrdersUserFile/unpaidOrdersUser';
import ActiveOrdersUser from './activeOrdersUser/ActiveOrdersUser';

const O_User = () => {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllOrdersUser />;
      case "unpaid":
        return <UnpaidOrdersUser />;
      case "active":
        return <ActiveOrdersUser />;
      default:
        return null;
    }
  };

  return (
    <div className="order-user">
      <div className="container">
        <div className="order-user__all-box">
          <ul className="order-user__item-box">
            <li
              className={`order-user__list ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Barcha buyurtmalar
            </li>
            <li
              className={`order-user__list ${activeTab === "unpaid" ? "active" : ""}`}
              onClick={() => setActiveTab("unpaid")}
            >
              To'lov qilinmagan
            </li>
            <li
              className={`order-user__list ${activeTab === "active" ? "active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Faol
            </li>
          </ul>

          <div className="order-user__window-box1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default O_User;
