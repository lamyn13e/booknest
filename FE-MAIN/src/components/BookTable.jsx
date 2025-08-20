import React from 'react';

export default function BookTable({ books, onEdit, onDelete }) {
  if (!books.length) {
    return <p className="text-center text-gray-500">Không có sách nào.</p>;
  }
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Ảnh</th>
          <th className="border px-2 py-1">Tiêu đề</th>
          <th className="border px-2 py-1">Tác giả</th>
          <th className="border px-2 py-1">Thể loại</th>
          <th className="border px-2 py-1">Giá</th>
          <th className="border px-2 py-1">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {books.map(b => (
          <tr key={b.bookId} className="hover:bg-gray-50">
            <td className="border px-2 py-1">
              <img src={b.imgUrl || 'https://via.placeholder.com/80x100'} alt="" className="w-16 h-20 object-cover" />
            </td>
            <td className="border px-2 py-1">{b.title}</td>
            <td className="border px-2 py-1">{b.author}</td>
            <td className="border px-2 py-1">{b.categoryName}</td>
            <td className="border px-2 py-1">{b.price.toLocaleString()}₫</td>
            <td className="border px-2 py-1 space-x-2">
              <button onClick={() => onEdit(b)} className="text-blue-600 hover:underline">Sửa</button>
              <button onClick={() => onDelete(b.bookId)} className="text-red-600 hover:underline">Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
