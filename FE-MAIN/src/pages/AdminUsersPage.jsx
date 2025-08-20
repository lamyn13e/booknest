import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';   // thay vì import axios trực tiếp
import UserFilterBar from '../components/UserFilterBar';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 1. Load tất cả user có role CUSTOMER hoặc SELLER
  useEffect(() => {
    api.get('/api/users')
      .then(res => {
        const list = res.data.filter(u =>
          u.roles.includes('ROLE_CUSTOMER') ||
          u.roles.includes('ROLE_SELLER')
        );
        console.log('Tải người dùng thành công:', res.data);
        setUsers(list);
        setFiltered(list);
      })
      .catch(console.error);
  }, []);

  // 2. Filter client-side
  const handleFilter = ({ query, role }) => {
    let list = [...users];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(u =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    if (role) {
      list = list.filter(u => u.roles.includes(role));
    }
    setFiltered(list);
  };

  // 3. Create or update
  const upsertUser = (user) => {
    if (user.userId) {
      api.put(`/api/users/${user.userId}`, user)
        .then(res => {
          const updated = users.map(u => u.userId === user.userId ? res.data : u);
          setUsers(updated); setFiltered(updated);
        })
        .catch(console.error);
    } else {
      api.post('/api/users', user)
        .then(res => {
          const updated = [...users, res.data];
          setUsers(updated); setFiltered(updated);
        })
        .catch(console.error);
    }
    setShowForm(false);
  };

  // 4. Delete
  const deleteUser = (id) => {
    if (!window.confirm('Xác nhận xóa tài khoản này?')) return;
    api.delete(`/api/users/${id}`)
      .then(() => {
        const updated = users.filter(u => u.userId !== id);
        setUsers(updated); setFiltered(updated);
      })
      .catch(console.error);
  };

  return (
    
    <div className="min-h-screen flex flex-col bg-bg">
          <Header />
          <main className="container mx-auto flex-1 px-4 py-8">
            <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => { setEditingUser(null); setShowForm(true); }}
        >
          Thêm tài khoản
        </button>
      </div>

      <UserFilterBar onFilter={handleFilter} />

      <UserTable
        users={filtered}
        onEdit={u => { setEditingUser(u); setShowForm(true); }}
        onDelete={deleteUser}
      />

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={() => setShowForm(false)}
          onSubmit={upsertUser}
        />
      )}
    </div>
          </main>
          <Footer />
        </div>
  );
}
