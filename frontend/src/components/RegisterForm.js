import { useState } from 'react'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý đăng ký tại đây
  };

  return (
    <div className="login-page container w-50 mt-5">
      <form onSubmit={handleSubmit} className="container mt-5">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Tên người dùng</label>
          <input 
            type="text" 
            id="username" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mật khẩu</label>
          <input 
            type="password" 
            id="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
      </form>
    </div>
  )
}

export default RegisterForm
