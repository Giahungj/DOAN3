import React from 'react';
import DoctorList from '../components/DoctorList'

const HomePage = () => {
  return (
    <div>
      <h1>Đây là Trang Chủ của hệ thống</h1>
      <p>Học cách xây dựng hệ thống với React</p>
      <DoctorList />
      <a href="http://localhost:6969/admin">
        Chuyển đến trang Admin
      </a>
    </div>
  );
};

export default HomePage;
