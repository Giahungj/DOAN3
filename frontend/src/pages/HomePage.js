import React from 'react';
import DoctorList from '../components/DoctorList'

const HomePage = () => {
  return (
    <main>
      <h1>Đây là Trang Chủ của hệ thống</h1>
      <p className='m-0'>Học cách xây dựng hệ thống với React</p>
      <p className='m-0'>Bác sĩ nổi bật</p>
      <p className='m-0'>Chuyên khoa nổi bật</p>
      <p className='m-0'>Phòng khám nổi bật</p>
      <DoctorList />
    </main>
  );
};

export default HomePage;
