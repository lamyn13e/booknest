import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SellerBooksPage from './pages/SellerBooksPage';
import AdminUsersPage from './pages/AdminUsersPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import SellerDashboard from './pages/SellerDashboard';
// import other pages: Login, Register, CustomerDashboard, SellerDashboard, AdminManage

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller" element={<SellerBooksPage />} />
        <Route path="/admin" element={<AdminUsersPage />} />Statistical
        <Route path="/orders" element={<SellerOrdersPage />} />
        <Route path="/statistical" element={<SellerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
