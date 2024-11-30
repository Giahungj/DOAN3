import React from 'react';
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h1 className="text-center mb-4 fw-bold">ĐĂNG KÝ</h1>
          <RegisterForm />
          <p className='text-center'>Bạn đã có tài khoản <a href="/dang-nhap">Đăng nhập</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
