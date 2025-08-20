import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SearchBar from '../components/Common/SearchBar';
import BookGrid from '../components/Books/BookGrid';
import axios from 'axios';

export default function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/books');
        setAllBooks(res.data);
        setFilteredBooks(res.data); // Ban đầu hiển thị toàn bộ
        console.log('Tải sách thành công:', res.data);
      } catch (err) {
        console.error('Lỗi khi tải sách:', err);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = ({ query, genre, minPrice, maxPrice }) => {
    let filtered = [...allBooks];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(q) ||
        book.author?.toLowerCase().includes(q)
      );
    }

    if (genre) {
      filtered = filtered.filter(book =>
        book.categoryName?.toLowerCase() === genre.toLowerCase()
      );
    }

    if (minPrice) {
      filtered = filtered.filter(book => book.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(book => book.price <= parseFloat(maxPrice));
    }

    setFilteredBooks(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        <BookGrid books={filteredBooks} />
      </main>
      <Footer />
    </div>
  );
}
