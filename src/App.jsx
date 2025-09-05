// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Layout from './Layout/Layout';
import Header from './Components/HomePage/HomeHeaderCom/Header';
import Section from './Components/HomePage/HomeSection/Section';
import Main from './Components/HomePage/HomeMain/Main';
import Login from './Login/Login';
import User from './Login/Components_user/user/User';
import Admin from './Login/Components_admin/admin/Admin';
import Products from './Components/ProductPage/Products';
import Product from './Components/ProductPage/OneProductPage/Product';
import Cart from './Components/HomePage/HomeNavCom/cartPage/Cart';
import AuthProvider, { AuthContext } from './Login/AuthContext';

// ✅ ProtectedRoute funksiyasi
// App.jsx ichida
const ProtectedRoute = ({ role, children }) => {
  const { isLoggedIn, userRole } = useContext(AuthContext);

  // Agar state yo'q bo‘lsa, localStorage orqali tekshiramiz
  const savedLogin = localStorage.getItem('isLoggedIn') === 'true';
  const savedRole = localStorage.getItem('userRole');

  if (!(isLoggedIn || savedLogin)) return <Navigate to="/login" />;

  if (role && role !== userRole && role !== savedRole) {
    return <Navigate to="/login" />;
  }

  return children;
};


const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, count: item.count + product.count }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout cartCount={cartItems.length}>
          <Routes>
            <Route path="/" element={<><Header /><Section /><Main /></>} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/product/:id" element={<Product addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} clearCart={clearCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute role="user">
                <User />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
