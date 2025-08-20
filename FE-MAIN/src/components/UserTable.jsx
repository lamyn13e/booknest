import React from 'react';

export default function UserTable({ users, onEdit, onDelete }) {
  if (!users.length) {
    return <p className="text-center text-gray-500">Không có tài khoản nào.</p>;
  }
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Họ và Tên</th>
          <th className="border px-2 py-1">Email</th>
          <th className="border px-2 py-1">Vai trò</th>
          <th className="border px-2 py-1">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.userId} className="hover:bg-gray-50">
            <td className="border px-2 py-1">{u.fullName}</td>
            <td className="border px-2 py-1">{u.email}</td>
            <td className="border px-2 py-1">
              {u.roles.map(r => r.replace('ROLE_','')).join(', ')}
            </td>
            <td className="border px-2 py-1 space-x-2">
              <button onClick={() => onEdit(u)} className="text-blue-600 hover:underline">Sửa</button>
              <button onClick={() => onDelete(u.userId)} className="text-red-600 hover:underline">Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
