import React, { useState } from 'react';

const LoginPage = () => {
  // State để lưu thông tin người dùng nhập
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra thông tin đăng nhập
    if (username === 'admin' && password === 'abc') {
      // Chuyển hướng đến trang DoctorPage nếu đăng nhập thành công
      window.location.href = '/'
    } else {
      setError('Sai tài khoản hoặc mật khẩu')
    }
  }

  return (
    <div className="login-page container w-25 mt-5">
    <h1 className="text-center mb-4">Đăng Nhập</h1>
    {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userName" className="form-label">Tài khoản:</label>
        <input
          type="text"
          id="userName"
          className="form-control"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
      <p className="mt-3 text-center">
        Chưa có tài khoản? 
        <a className="btn btn-link" href="/dang-ky">Đăng ký</a>
      </p>
    </form>
  </div>
  )
}

export default LoginPage

