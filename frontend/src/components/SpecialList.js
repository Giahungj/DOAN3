import React, { useState, useEffect } from 'react'
import useLoading from '../hooks/useLoading'

const SpecialList = () => {
    const [specials, setSpecials] = useState([]) // Khai báo state để lưu trữ danh sách người dùng
    const [page, setPage] = useState(1) // Khai báo trang hiện tại
    const [error, setError] = useState(null) // Khai báo state để lưu lỗi (nếu có)
    const { loading, setLoadingState } = useLoading() // Khai báo state để lưu trạng thái loading

    const fetchSpecials = async () => {
        try {
            const response = await fetch(`http://localhost:6969/api/chuyen-khoa/?page=${page}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const { specialsData } = await response.json()
            console.log(specialsData)
            const specials = specialsData.map(special => ({
                special_id: special.special_id,
                special_name: special.name,
            }))
            setSpecials(prevSpecials => [...prevSpecials, ...specials]) // Cập nhật danh sách bác sĩ
            setLoadingState(false) // Set loading state là false khi tải xong
        } catch (err) {
            setError(err.message)
            setLoadingState(false)
        }
    }
    
    useEffect(() => { // Sử dụng useEffect để fetch dữ liệu mỗi khi trang thay đổi
        fetchSpecials()
    }, [page]) // Mỗi khi trang thay đổi, gọi lại fetchSpecials()

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
                {specials.map(special => (
                    <div key={special.special_id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{special.special_name}</h5>
                                <p className="card-text">{special.special_name}</p>
                                <ul className="list-unstyled">
                                    <li><strong>Mã chứng chỉ:</strong> {special.special_name}</li>
                                    <li><strong>Giá khám người Việt:</strong> {special.special_name}</li>
                                    <li><strong>Giá khám người nước ngoài:</strong> {special.special_name}</li>
                                    <li><strong>Kinh nghiệm:</strong> {special.special_name}</li>
                                </ul>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => handleBookAppointment(special.special_id)}>
                                        Đặt lịch
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => handleViewDetails(special.special_id)}>
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

export default SpecialList
