import React, { useState } from 'react';

const ROLES = [
  { value: '', label: 'Tất cả vai trò' },
  { value: 'ROLE_CUSTOMER', label: 'Customer' },
  { value: 'ROLE_SELLER', label: 'Seller' },
];

export default function UserFilterBar({ onFilter }) {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');

  const submit = e => {
    e.preventDefault();
    onFilter({ query, role });
  };

  return (
    <form onSubmit={submit} className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Tìm tên hoặc email..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="p-2 border rounded"
      >
        {ROLES.map(r => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Lọc
      </button>
    </form>
  );
}
