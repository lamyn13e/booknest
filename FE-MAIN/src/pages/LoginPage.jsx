import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await axios.post(
        'http://localhost:8081/login',
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const res = await axios.get('http://localhost:8081/api/current-user', {
      withCredentials: true,
    });

        const roles = res.data.roles.map(r => r.authority);
        console.log('User roles:', roles);
        if (roles.includes('ROLE_ADMIN')) {
            window.location.href = '/admin';
        } else if( roles.includes('ROLE_SELLER')) {
            window.location.href = '/seller';
        } else {
            window.location.href = '/';
        }
    } catch (error) {
      setErrorMsg('Đăng nhập thất bại. Vui lòng kiểm tra email hoặc mật khẩu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Đăng Nhập BookNest
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <div className="text-sm text-red-600 mt-2">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Bạn chưa có tài khoản?{' '}
          <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}
