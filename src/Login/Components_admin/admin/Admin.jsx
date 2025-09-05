// Admin.jsx
import React from 'react';
import './admin.scss'; // faraz qilamiz bu sizning admin UI faylingiz
import AdminPanel from '../admin_pages/AdminPanel'; // faraz

const Admin = () => {
  const role = localStorage.getItem('userRole');

  if (role !== 'admin') {
    return <p style={{ color: 'red', textAlign: 'center' }}>❌ Sizda admin sahifasiga ruxsat yo‘q</p>;
  }

  return (
    <div className="admin">
      <div className="container">
        <h2>Admin Panel</h2>
        <AdminPanel />
      </div>
    </div>
  );
};

export default Admin;
