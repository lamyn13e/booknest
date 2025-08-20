import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_CUSTOMER'); // Mặc định Customer
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await axios.post('http://localhost:8081/api/register', {
        fullName,
        email,
        password,
        roleName: role
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      navigate('/login');
    } catch (error) {
      setErrorMsg('Đăng ký thất bại. Email có thể đã tồn tại hoặc dữ liệu không hợp lệ.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Đăng Ký BookNest
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FullName */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Họ và Tên
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Nguyễn Văn A"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Role Radios */}
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">Đăng ký với vai trò</legend>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="ROLE_CUSTOMER"
                  checked={role === 'ROLE_CUSTOMER'}
                  onChange={() => setRole('ROLE_CUSTOMER')}
                  className="form-radio"
                />
                <span className="ml-2">Khách hàng</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="ROLE_SELLER"
                  checked={role === 'ROLE_SELLER'}
                  onChange={() => setRole('ROLE_SELLER')}
                  className="form-radio"
                />
                <span className="ml-2">Người bán</span>
              </label>
            </div>
          </fieldset>

          {errorMsg && (
            <div className="text-sm text-red-600 mt-2">{errorMsg}</div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300"
          >
            Đăng Ký
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
