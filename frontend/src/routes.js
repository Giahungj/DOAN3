import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DoctorPage from './pages/DoctorPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/bac-si" element={<DoctorPage />} />
                <Route path="/dang-nhap" element={<LoginPage />} />
                <Route path="/dang-ky" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 