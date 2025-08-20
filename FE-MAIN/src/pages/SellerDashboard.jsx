import React from 'react';
import { sellerStats } from '../data/fakeStats';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const SellerDashboard = () => {
  const { revenue, booksSold, orders, bestSellers } = sellerStats;

  return (
    <div className="min-h-screen flex flex-col bg-bg">
          <Header />
          <main className="container mx-auto flex-1 px-4 py-8">
            <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h2 className="text-sm text-gray-500">Total Revenue</h2>
          <p className="text-2xl text-green-600 font-semibold mt-2">
            {revenue.toLocaleString()} đ
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h2 className="text-sm text-gray-500">Books Sold</h2>
          <p className="text-2xl text-blue-600 font-semibold mt-2">{booksSold}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h2 className="text-sm text-gray-500">Orders</h2>
          <p className="text-2xl text-purple-600 font-semibold mt-2">{orders}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🔥 Best-selling Books</h2>
        <ul className="divide-y divide-gray-200">
          {bestSellers.map((book, idx) => (
            <li key={idx} className="py-3 flex justify-between">
              <span className="text-gray-800">{book.title}</span>
              <span className="font-medium text-blue-500">{book.quantity} sold</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
          </main>
          <Footer />
        </div>
    
  );
};

export default SellerDashboard;
