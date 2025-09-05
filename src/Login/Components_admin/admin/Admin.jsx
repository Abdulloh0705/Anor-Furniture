// Admin.jsx
import React from 'react';
import './admin.scss'; // faraz qilamiz bu sizning admin UI faylingiz
import ProductAddDell from '../productAddandDel/ProductAddDell';

const Admin = () => {
  const role = localStorage.getItem('userRole');

  if (role !== 'admin') {
    return <p style={{ color: 'red', textAlign: 'center' }}>❌ Sizda admin sahifasiga ruxsat yo‘q</p>;
  }

  return (
    <div className="admin">
      <div className="container">
        <h2>Admin Panel</h2>
        <ProductAddDell />
      </div>
    </div>
  );
};

export default Admin;
