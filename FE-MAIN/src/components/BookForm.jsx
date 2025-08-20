import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  { id: 1, name: 'Khoa học viễn tưởng' },
  { id: 2, name: 'Công nghệ thông tin' },
  { id: 3, name: 'Kinh doanh & Khởi nghiệp' }
];

export default function BookForm({ book, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    imgUrl: '',
    categoryName: ''
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        description: book.description || '',
        price: book.price,
        imgUrl: book.imgUrl || '',
        categoryName: book.categoryName
      });
    }
  }, [book]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...form };
    if (book) payload.bookId = book.bookId;
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{book ? 'Sửa sách' : 'Thêm sách mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['title', 'author', 'imgUrl'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium">{field === 'imgUrl' ? 'Image URL' : field.charAt(0).toUpperCase()+field.slice(1)}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded"
                required={field !== 'imgUrl'}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium">Mô tả</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Giá (VNĐ)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Thể loại</label>
            <select
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Chọn thể loại</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
              {book ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
