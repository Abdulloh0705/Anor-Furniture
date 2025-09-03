// src/Layout/Layout.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/HomePage/HomeNavCom/Navbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const Layout = ({ cartCount, children }) => {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/admin" ||
    location.pathname === "/cart" ||
    location.pathname === "/profile" ||
    location.pathname.startsWith("/product");

  return (
    <>
      <Navbar cartCount={cartCount} />
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
