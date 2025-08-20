import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  SHIPPED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:8081/api/seller/orders', {
      withCredentials: true,
    });
    setOrders(res.data);
  };

  const updateStatus = async (orderId, newStatus) => {
    await axios.put(`http://localhost:8081/api/seller/orders/${orderId}/status?status=${newStatus}`);
    fetchOrders(); // reload list
  };

  const filteredOrders = filterStatus === 'ALL'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  return (
    
    <div className="min-h-screen flex flex-col bg-bg">
          <Header />
          <main className="container mx-auto flex-1 px-4 py-8">
            <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h2>

      <div className="mb-4">
        <label className="font-medium mr-2">Lọc theo trạng thái:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="ALL">Tất cả</option>
          <option value="PENDING">Chờ xác nhận</option>
          <option value="PAID">Đã thanh toán</option>
          <option value="SHIPPED">Đã giao hàng</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <div key={order.orderId} className="bg-white p-5 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold">Mã đơn: #{order.orderId}</h3>
                <p className="text-sm text-gray-600">Khách hàng: {order.customerName}</p>
                <p className="text-sm text-gray-600">Ngày đặt: {new Date(order.orderDate).toLocaleString()}</p>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}
              >
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-800 mb-2">
              <strong>Sách đã bán:</strong> {order.bookTitles.join(', ')}
            </div>
            <div className="text-sm text-gray-800 mb-2">
              <strong>Tổng tiền: {order.totalAmount} VNĐ</strong>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Cập nhật trạng thái:</label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.orderId, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <p className="text-gray-500">Không có đơn hàng phù hợp.</p>
        )}
      </div>
    </div>
          </main>
          <Footer />
        </div>
  );
}
