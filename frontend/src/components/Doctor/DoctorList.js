// UserList.js (Một component React)
import React, { useState, useEffect } from 'react';

const DoctorList = () => {
    // Khai báo state để lưu trữ danh sách người dùng
    const [doctors, setDoctors] = useState([]);
    // Khai báo state để lưu trạng thái loading
    const [loading, setLoading] = useState(true);
    // Khai báo state để lưu lỗi (nếu có)
    const [error, setError] = useState(null);

    // Sử dụng useEffect để fetch dữ liệu khi component được mount
    useEffect(() => {
      const fetchDoctors = async () => {
          try {
              const response = await fetch('http://localhost:6969/api/bac-si');
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setDoctors(data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };
  
      fetchDoctors();
    }, []);

    // Nếu đang loading, hiển thị thông báo loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Hiển thị danh sách người dùng
    return (
        <ul>
            {doctors.map(doctor => (
                <li key={doctor.doctor_id}>
                    {doctor.licence_number}, 
                    {doctor.introduction}, 
                    {doctor.working_schedule}, 
                    {doctor.price_vietnamese}, 
                    {doctor.price_foreigners}, 
                    {doctor.work_experience}, 
                    {doctor.education}, 
                    {doctor.user_id}, 
                    {doctor.schedule_id}, 
                    {doctor.medical_facility_id}, 
                </li>
            ))}
        </ul>
    );
};

export default DoctorList;
