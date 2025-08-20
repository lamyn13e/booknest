import React, { useState } from 'react';

const CATEGORIES = [
  'Khoa học viễn tưởng',
  'Công nghệ thông tin',
  'Kinh doanh & Khởi nghiệp'
];

export default function FilterBar({ onFilter }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onFilter({ query, category });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Tìm tên hoặc tác giả..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Tất cả thể loại</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Lọc
      </button>
    </form>
  );
}
