import React, { useState, useEffect } from 'react'
import useLoading from '../hooks/useLoading'

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]) // Khai báo state để lưu trữ danh sách người dùng
    const [page, setPage] = useState(1) // Khai báo trang hiện tại
    const [error, setError] = useState(null) // Khai báo state để lưu lỗi (nếu có)
    const { loading, setLoadingState } = useLoading() // Khai báo state để lưu trạng thái loading

    const fetchDoctors = async () => {
        try {
            const response = await fetch(`http://localhost:6969/api/bac-si/?page=${page}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const { doctorsData } = await response.json()
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
            setDoctors(prevDoctors => [...prevDoctors, ...doctors]) // Cập nhật danh sách bác sĩ
            setLoadingState(false) // Set loading state là false khi tải xong
        } catch (err) {
            setError(err.message)
            setLoadingState(false)
        }
    }
    
    useEffect(() => { // Sử dụng useEffect để fetch dữ liệu mỗi khi trang thay đổi
        fetchDoctors()
    }, [page]) // Mỗi khi trang thay đổi, gọi lại fetchDoctors()

    const handleScroll = () => { // Hàm để tăng số trang khi cuộn đến cuối
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !loading) {
            setPage(prevPage => prevPage + 1) // Tăng số trang khi cuộn đến cuối
        }
    }

    useEffect(() => { // Lắng nghe sự kiện cuộn
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll) // Dọn dẹp sự kiện khi component unmount
        }
    }, [loading])

    if (error) { // Nếu có lỗi, hiển thị thông báo lỗi
        return <div>Error: {error}</div>
    }
   
    return ( // Hiển thị danh sách người dùng
        <div className="container my-4">
            <div className="row d-flex justify-content-center">
                {doctors.map(doctor => (
                    <div key={doctor.doctor_id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <img src={`/images/${doctor.doctor_avatar}`} className="card-img-top" alt={doctor.doctor_name} />
                            <div className="card-body">
                                <h5 className="card-title">{doctor.doctor_name}</h5>
                                <p className="card-text">{doctor.introduction}</p>
                                <ul className="list-unstyled">
                                    <li><strong>Mã chứng chỉ:</strong> {doctor.licence_number}</li>
                                    <li><strong>Giá khám người Việt:</strong> {doctor.price_vietnamese}</li>
                                    <li><strong>Giá khám người nước ngoài:</strong> {doctor.price_foreigners}</li>
                                    <li><strong>Kinh nghiệm:</strong> {doctor.work_experience}</li>
                                </ul>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => handleBookAppointment(doctor.doctor_id)}>
                                        Đặt lịch
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => handleViewDetails(doctor.doctor_id)}>
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorList
