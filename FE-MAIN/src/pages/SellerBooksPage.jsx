import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import BookTable from '../components/BookTable';
import BookForm from '../components/BookForm';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

export default function SellerBooksPage() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load books của seller
  useEffect(() => {
    axios.get('http://localhost:8081/api/books/mine', { withCredentials: true })
      .then(res => {
        setBooks(res.data);
        setFiltered(res.data);
      })
      .catch(console.error);
  }, []);

  // Xử lý filter
  const handleFilter = ({ query, category }) => {
    let list = [...books];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(b =>
        b.title.toLowerCase().includes(q) ||
        (b.author && b.author.toLowerCase().includes(q))
      );
    }
    if (category) {
      list = list.filter(b => b.categoryName === category);
    }
    setFiltered(list);
  };

  // Thêm hoặc sửa xong
  const upsertBook = (book) => {
    if (book.bookId) {
      // cập nhật
      axios.put(`http://localhost:8081/api/books/${book.bookId}`, book, { withCredentials: true })
        .then(res => {
          const updated = books.map(b => b.bookId === book.bookId ? res.data : b);
          setBooks(updated);
          setFiltered(updated);
        });
    } else {
      // thêm mới
      axios.post('http://localhost:8081/api/books', book, { withCredentials: true })
        .then(res => {
          const updated = [...books, res.data];
          setBooks(updated);
          setFiltered(updated);
        });
    }
    setShowForm(false);
  };

  // Xóa sách
  const deleteBook = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa cuốn sách này không?')) return;
    axios.delete(`http://localhost:8081/api/books/${id}`, { withCredentials: true })
      .then(() => {
        const updated = books.filter(b => b.bookId !== id);
        setBooks(updated);
        setFiltered(updated);
      });
  };

  return (

    <div className="min-h-screen flex flex-col bg-bg">
          <Header />
          <main className="container mx-auto flex-1 px-4 py-8">
            <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sách của bạn</h1>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => { setEditingBook(null); setShowForm(true); }}
        >
          Thêm sách mới
        </button>
      </div>

      <FilterBar onFilter={handleFilter} />

      <BookTable
        books={filtered}
        onEdit={(book) => { setEditingBook(book); setShowForm(true); }}
        onDelete={deleteBook}
      />

      {showForm && (
        <BookForm
          book={editingBook}
          onClose={() => setShowForm(false)}
          onSubmit={upsertBook}
        />
      )}
    </div>
          </main>
          <Footer />
        </div>
  );
}
