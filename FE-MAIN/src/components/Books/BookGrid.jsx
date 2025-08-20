import React from 'react';
import BookCard from './BookCard';

export default function BookGrid({ books }) {
  if (!books.length) {
    return <p className="text-center text-muted">Không có sách nào.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}