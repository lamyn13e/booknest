import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch({ query, genre, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        placeholder="Tìm tên tác giả hoặc tiêu đề..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded"
      />
      <select
        value={genre}
        onChange={e => setGenre(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded"
      >
        <option value="">Chọn thể loại</option>
        <option value="Khoa học viễn tưởng">Khoa học viễn tưởng</option>
        <option value="Công nghệ thông tin">Công nghệ thông tin</option>
        <option value="Kinh doanh & Khởi nghiệp">Kinh doanh & Khởi nghiệp</option>
      </select>
      <input
        type="number"
        placeholder="Giá từ (VNĐ)"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
        className="w-32 p-3 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Giá đến (VNĐ)"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        className="w-32 p-3 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-secondary text-white px-6 py-3 rounded font-semibold hover:bg-primary transition duration-default"
      >
        Lọc
      </button>
    </form>
  );
}
