import React, { useState, useEffect } from 'react';
import useLoading from '../hooks/useLoading'

const DoctorList = () => {
    // Khai báo state để lưu trữ danh sách người dùng
    const [doctors, setDoctors] = useState([])

    // Khai báo state để lưu lỗi (nếu có)
    const [error, setError] = useState(null)
    
    // Khai báo state để lưu trạng thái loading
    const { loading, setLoadingState } = useLoading()

    // Sử dụng useEffect để fetch dữ liệu khi component được mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`http://localhost:6969/api/bac-si/?page=1`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const { doctorsData } = await response.json();
                const doctors = doctorsData.map(doctor => ({
                    doctor_id: doctor.doctor_id,
                    licence_number: doctor.licence_number,
                    introduction: doctor.introduction,
                    working_schedule: doctor.working_schedule,
                    price_vietnamese: doctor.price_vietnamese,
                    price_foreigners: doctor.price_foreigners,
                    work_experience: doctor.work_experience,
                    education: doctor.education,
                    doctor_name: doctor.doctor_name,
                    doctor_avatar: doctor.doctor_avatar,
                }))
                setDoctors(doctors);
            } catch (err) {
                setError(err.message);
            
                setLoadingState(false);
            }
        };
  
    fetchDoctors()
    }, []);

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Hiển thị danh sách người dùng
    return (
        <ul>
            {doctors.map(doctor => (
                <a href="/bac-si"><li key={doctor.doctor_id}>
                    {doctor.licence_number}, 
                    {doctor.introduction}, 
                    {doctor.working_schedule}, 
                    {doctor.price_vietnamese}, 
                    {doctor.price_foreigners}, 
                    {doctor.work_experience}, 
                    {doctor.education}, 
                    {doctor.doctor_name}, 
                </li></a>
            ))}
        </ul>
    );
};

export default DoctorList;
