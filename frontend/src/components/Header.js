import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand text-dark navbar-light bg-blue-200">
        <div class="container-fluid">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Trang chủ</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/bac-si">Bác sĩ</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/chuyen-khoa">Chuyên khoa</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/phong-kham">Phòng khám</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
};
