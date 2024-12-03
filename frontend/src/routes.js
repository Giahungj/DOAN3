import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DoctorPage from './pages/DoctorPage'
import SpecialPage from './pages/SpecialPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import {Header} from './components/Header'
import {Footer} from './components/Footer'

const AppRoutes = () => {
    return (
        <Router>
            <header className="d-flex justify-content-center py-3">
                <Header />
            </header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/bac-si" element={<DoctorPage />} />
                <Route path="/chuyen-khoa" element={<SpecialPage />} />
                
                <Route path="/dang-nhap" element={<LoginPage />} />
                <Route path="/dang-ky" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <footer>
                <Footer />
            </footer>
        </Router>
    )
}

export default AppRoutes 